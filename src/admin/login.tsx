import { useForm } from "react-hook-form";
import { z } from "zod";

import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import type { AdminLogin } from "../types/admin-login";
import { loginAdmin } from "../actions/auth";

function Login() {
  const navigate = useNavigate();
  const FormSchema = z.object({
    username: z.string().min(3, {
      message: "Username must be at least 3 characters.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const {
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: AdminLogin) => {
    try {
      await loginAdmin(data);
      reset();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="md:w-2/5 w-full rounded-3xl shadow-2xl p-10 flex flex-col gap-10 m-3 shadow-orange-300"
        >
          <h2 className="font-bold text-2xl text-[var(--primary)] underline">
            Admin Login
          </h2>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter username or email"
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

export default Login;
