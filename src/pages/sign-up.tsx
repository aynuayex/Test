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
import axios from "@/api/axios";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const signUpFormSchema = z
  .object({
    fullName: z
      .string()
      .min(3, { message: "Full Name must be at least 3 characters." }),
    email: z.string().email({ message: "Not a valid Email Address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(passwordRegex, {
        message:
          "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character.",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    persist: z.boolean(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "password and confirm password must match",
        path: ["confirmPassword"],
      });
    }
  });

type SignUpFormSchemaType = z.infer<typeof signUpFormSchema>;

const SignUp = () => {
  const { setAuth, setPersist } = useAuth();
  const navigate = useNavigate();
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const form = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      persist: JSON.parse(localStorage.getItem("persist") || "false"),
    },
  });

  const togglePasswordVisibility = () => setHidePassword(!hidePassword);
  const passwordType = hidePassword ? "password" : "text";

  const toggleConfirmPasswordVisibility = () =>
    setHideConfirmPassword(!hideConfirmPassword);
  const confirmPasswordType = hideConfirmPassword ? "password" : "text";
  
// This will be updated depending on the API
  const onSubmit = async (data: SignUpFormSchemaType) => {
    try {
      const { persist, ...dataWithOutPersist } = data;
      setPersist(persist);
      localStorage.setItem("persist", JSON.stringify(persist));
      console.log({ data });
      const response = await axios.post(`/users/register`, dataWithOutPersist);
      if (response.status === 201) {
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
        toast.success(message);
        setAuth({ id, email, fullName, role, accessToken, emailVerified });

        localStorage.setItem("userId", id);
        navigate("/verify-email");
      }
      console.log(response);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      if (!err?.response) {
        toast.error("Server can not be reached, Please Try again later!");
      } else if (err.response?.status === 400) {
        toast.error("Missing One of the Fields, Please fill All!");
      } else if (err.response?.status === 409) {
        toast.error(err.response?.data.message);
      } else {
        toast.error("Registration Failed, Please Try again later!");
      }
    }
  };

  return (
    
    <div className="h-[calc(100vh-80px)] w-full flex justify-center items-center">
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-background/80 space-y-6 w-full sm:w-1/3 mt-4 sm:mt-0 flex flex-col justify-center items-center p-2 py-4 border rounded-lg shadow"
      >
        <Heading title="Complete Your Signup" />
        <div className="w-full flex flex-col justify-center items-center gap-4 sm:gap-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="w-3/4 ">
                <FormLabel className="">
                  Enter Your Name<span className="-ml-1 text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-white"
                    disabled={form.formState.isSubmitting}
                    placeholder="First & Last Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-3/4 ">
                <FormLabel>
                  Enter Your Email<span className="-ml-1 text-red-600">*</span>
                </FormLabel>
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
                <FormLabel>
                  Create Password<span className="-ml-1 text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <div className="w-full relative  ">
                    <Input
                      type={passwordType}
                      className="bg-white"
                      disabled={form.formState.isSubmitting}
                      placeholder="Enter your Password"
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="w-3/4 ">
                <FormLabel>
                  Confirm Password<span className="-ml-1 text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <div className="w-full relative  ">
                    <Input
                      type={confirmPasswordType}
                      className="bg-white"
                      disabled={form.formState.isSubmitting}
                      placeholder="Enter your Confirm Password"
                      {...field}
                    />
                    <span
                      className="absolute left-[calc(100%-28px)] top-1/2 transform -translate-y-1/2 cursor-pointer dark:text-white"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {hideConfirmPassword ? <Eye /> : <EyeOff />}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="persist"
            render={({ field }) => (
              <FormItem className="w-3/4 flex">
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

        <Button
          className="w-3/4 bg-[#1d3752]"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          Continue
        </Button>

        <p className="text-center">By proceeding you are agreeing to the</p>
        <p className="text-center -mt-7">
          <Link className="text-blue-600 underline" to="/sign-up">
            Terms & Condtions
          </Link>{" "}
          and{" "}
          <Link className="text-blue-600 underline" to="/sign-up">
            Privacy Policy
          </Link>
        </p>

        <p className="text-center">
          Already have an account?{" "}
          <Link className="text-blue-600 underline" to="/sign-in">
            LogIn
          </Link>
        </p>
      </form>
    </Form>
    </div>
  );
};

export default SignUp;
