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
import { useNavigate } from "react-router";
import { z } from "zod";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import axios from "@/api/axios";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const officeFormSchema = z
  .object({
    fullName: z
      .string()
      .min(3, { message: "Full Name must be at least 3 characters." }),
    email: z.string().email({ message: "Not a valid Email Address." }),
    companyName: z
      .string()
      .min(3, { message: "Company Name must be at least 3 characters." }),
    companyWebsite: z
      .string()
      .min(3, { message: "Company website must be at least 3 characters." }),
    companySize: z.enum(["", "startup", "medium", "large", "enterprise"], {
      required_error: "Please select the company size.",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 4 characters." })
      .regex(passwordRegex, {
        message:
          "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character.",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 4 characters." }),
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

type OfficeFormSchemaType = z.infer<typeof officeFormSchema>;

const Office = () => {
  const { setAuth, setPersist } = useAuth();
  const navigate = useNavigate();
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const form = useForm<OfficeFormSchemaType>({
    resolver: zodResolver(officeFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      companyName: "",
      companyWebsite: "",
      companySize: "",
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
  const onSubmit = async (data: OfficeFormSchemaType) => {
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
    <div className="w-full flex justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-background/80 space-y-6 w-full sm:w-1/3 mt-4 sm:mt-0 flex flex-col justify-center items-center p-1 border rounded-lg shadow"
        >
          <Heading className="text-xl mt-1" title="Set Up Your Office" />
          <div className="w-22 h-22 rounded-full bg-[#1d3752] flex justify-center items-center text-white">
            Logo Here
          </div>
          <div className="w-full flex flex-col justify-center items-center gap-4 sm:gap-4">
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
                      className="bg-white h-8"
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
                    Enter Your Email
                    <span className="-ml-1 text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      className="bg-white h-8 "
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
              name="companyName"
              render={({ field }) => (
                <FormItem className="w-3/4 ">
                  <FormLabel>
                    Your Company Name
                    <span className="-ml-1 text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white h-8 "
                      disabled={form.formState.isSubmitting}
                      placeholder="Name Here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyWebsite"
              render={({ field }) => (
                <FormItem className="w-3/4 ">
                  <FormLabel>
                    Your Company Website
                    <span className="-ml-1 text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white h-8 "
                      disabled={form.formState.isSubmitting}
                      placeholder="Website Here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companySize"
              render={({ field }) => (
                <FormItem className="w-3/4 ">
                  <FormLabel>
                    Company Size<span className="-ml-1 text-red-600">*</span>
                  </FormLabel>
                  <Select
                    disabled={form.formState.isSubmitting}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white h-8 w-full">
                        <SelectValue placeholder="Choose Your Company Size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="startup">0-10 Employees</SelectItem>
                      <SelectItem value="medium">10-50 Employees</SelectItem>
                      <SelectItem value="large">50-100 Employees</SelectItem>
                      <SelectItem value="enterprise">
                        {`>`} 100 Employees
                      </SelectItem>
                    </SelectContent>
                  </Select>
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
                        className="bg-white h-8 "
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
                    Confirm Password
                    <span className="-ml-1 text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="w-full relative  ">
                      <Input
                        type={confirmPasswordType}
                        className="bg-white h-8 "
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
          </div>

          <Button
            className="w-3/4 bg-[#1d3752]"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Office;
