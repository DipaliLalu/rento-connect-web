
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import z from "zod";
import { getUserInfo } from "../utils/utils";
import type { Profile } from "../types/admin-login";
import { updateAdmin } from "../actions/auth";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

function Profile() {
  const user = getUserInfo();
  const navigate = useNavigate();
  const FormSchema = z.object({
    username: z.string().min(3, {
      message: "Username must be at least 3 characters.",
    }),
    email: z
      .string()
      .min(3, {
        message: "Email must be at least 3 characters.",
      })
      .email(),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: user?.data.username || "",
      email: user?.data.email || "",
      password: "",
    },
  });

  const {
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: Profile) => {
    try {
      if (user?.data?.user_id != null) {
        await updateAdmin(user?.data?.user_id, data);
        reset({
          username: data.username,
          email: data.email,
          password: "",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <section className="min-h-screen flex justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="md:w-2/5 w-full rounded-3xl shadow-2xl p-10 flex flex-col gap-10 m-3 shadow-blue-500"
        >
          <div>
            <h2 className="font-bold text-2xl text-blue-900 underline">
              Edit Profile
            </h2>
            <Link to={"/dashboard"} className="text-slate-600 mt-3">
              Go to dashboard
            </Link>
          </div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter username"
                    disabled
                    {...field}
                    name="username"
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
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email" {...field} name="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter password"
                    {...field}
                    name="password"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="lg:w-4/12 self-center w-full cursor-pointer"
            disabled={isSubmitting ? true : false}
          >
            Submit
          </Button>
        </form>
      </Form>
    </section>
  );
}

export default Profile;
