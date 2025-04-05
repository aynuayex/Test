import { zodResolver } from "@hookform/resolvers/zod";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "@/api/axios";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const signInFormSchema = z.object({
  email: z.string().email({ message: "Not a valid Email Address." }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters." }),
  persist: z.boolean(),
});

type SignInFormSchemaType = z.infer<typeof signInFormSchema>;

const SignIn = () => {
  const navigate = useNavigate();
  const [hidePassword, setHidePassword] = useState(true);
  const { setAuth, setPersist } = useAuth();
  const form = useForm<SignInFormSchemaType>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
      persist: JSON.parse(localStorage.getItem("persist") || "false"),
    },
  });

  const togglePasswordVisibility = () => setHidePassword(!hidePassword);

  const passwordType = hidePassword ? "password" : "text";

  const onSubmit = async (data: SignInFormSchemaType) => {
    try {
      const { persist, ...dataWithOutPersist } = data;
      setPersist(persist);
      localStorage.setItem("persist", JSON.stringify(persist));
      console.log({ data });
      const response = await axios.post(`/users/login`, dataWithOutPersist);
      if (response.status === 200) {
        const {
          message,
          id,
          email,
          fullName,
          role,
          accessToken,
          emailVerified,
        } = response.data;
        console.log({
          message,
          id,
          email,
          fullName,
          role,
          accessToken,
          emailVerified,
        });
        setAuth({ id, email, fullName, role, accessToken, emailVerified });
        toast.success(message);

        navigate("/dashboard");
      }
      console.log(response);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      if (!err?.response) {
        toast.error("Server can not be reached, Please Try again later!");
      } else if (err.response?.status === 400) {
        toast.error("Missing Email or Password!");
      } else if (err.response?.status === 401) {
        toast.error("Unauthorized, Your Email and/or Password is not correct!");
      } else if (err.response?.status === 403) {
        const { id, email, fullName, role, accessToken, emailVerified } =
          err.response.data;
        console.log({ id, email, fullName, role, accessToken, emailVerified });
        setAuth({ id, email, fullName, role, accessToken, emailVerified });
        toast.error(
          "Forbidden,You need to verify your email before you LogIn!"
        );
        navigate("/verify-email");
      } else {
        toast.error("Login Failed, Please Try again later!");
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-background/80 space-y-8 w-4/5 sm:w-1/3 mt-4 sm:mt-0 flex flex-col justify-center items-center p-2 py-4 rounded-lg shadow"
      >
        <Heading title="Welcome Back" />
        <div className="w-full flex flex-col justify-center items-center gap-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-3/4 ">
                <FormLabel>Enter Your Email<span className="-ml-1 text-red-600">*</span></FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="bg-white"
                    disabled={form.formState.isSubmitting}
                    placeholder="Email Here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-3/4 ">
                <FormLabel>Enter Your Password<span className="-ml-1 text-red-600">*</span></FormLabel>
                <FormControl>
                  <div className="w-full relative">
                    <Input
                      type={passwordType}
                      className="bg-white"
                      disabled={form.formState.isSubmitting}
                      placeholder="Type Password"
                      {...field}
                    />
                    <span
                      className="absolute left-[calc(100%-28px)] top-1/2 transform -translate-y-1/2 cursor-pointer dark:text-white"
                      onClick={togglePasswordVisibility}
                    >
                      {hidePassword ? <Eye /> : <EyeOff />}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex justify-around items-center">
            <div>
              <FormField
                control={form.control}
                name="persist"
                render={({ field }) => (
                  <FormItem className="flex">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Remember me</FormLabel>
                  </FormItem>
                )}
              />
            </div>
            <Link className="text-blue-600 underline -mt-5" to="/sign-up">
              Forgot Password
            </Link>
          </div>
        </div>

        <Button
          className="w-3/4 bg-[#1d3752]"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          Continue
        </Button>
        <p className="text-center">By proceeding you are agreeing to the</p>
        <p className="text-center -mt-[38px]">
          <Link className="text-blue-600 underline" to="/sign-up">
            Terms & Condtions
          </Link>{" "}
          and{" "}
          <Link className="text-blue-600 underline" to="/sign-up">
            Privacy Policy
          </Link>
        </p>
        <p className="text-center">
          Have not an account?{" "}
          <Link className="text-blue-600 underline" to="/sign-up">
            Sign up
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default SignIn;
