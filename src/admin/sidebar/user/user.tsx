"use client";

import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import type { User } from "../../../types/user";
import { addUser, updateUser, useGetPermission, useGetRoles, useGetUser } from "../../../actions/user";
import PermissionForm from "../../../components/permission-form";
import { Label } from "../../../components/ui/label";
import RoleForm from "../../../components/roles-form";


// Schema
const schema = z.object({
  user_id: z.string().optional(),
  username: z.string().min(3, "Minimum 3 characters required"),
  password: z.string().optional(),
  email: z.string().min(3, "Minimum 3 characters required"),
  mobile: z.string().min(3, "Minimum 3 characters required"),
  id_proof: z
    .any()
    .refine((file) => !file || (file instanceof FileList && file.length > 0), {
      message: "Id proof is required for new user",
    })
    .refine((file) => !file || file[0]?.type === "application/pdf", {
      message: "Only PDF files allowed",
    })
    .optional(),
  roles: z.array(z.string()).default([]),
  permission: z.array(z.string()).default([]),
});

type FormData = z.infer<typeof schema>;

export default function User() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { Permissions } = useGetPermission();
  const { roles } = useGetRoles();
  const {mutate}=useGetUser();

  const users: User | undefined = location.state?.user;
  const defaultValues: FormData = {
    user_id: users?.user_id ?? undefined,
    username: users?.username || "",
    password: "",
    email: users?.email || "",
    mobile: users?.mobile || "",
    id_proof: "",
    roles: typeof users?.roles === "string"
      ? JSON.parse(users.roles)
      : users?.roles || [],

    permission: typeof users?.permission === "string"
      ? JSON.parse(users.permission)
      : users?.permission || [],

  };

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formData = new FormData();
    if (data.user_id)
      formData.append("user_id", data.user_id.toString());
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("mobile", data.mobile);
    formData.append("roles", JSON.stringify(data.roles))
    formData.append("permission", JSON.stringify(data.permission))

    if (data.password)
      formData.append("password", data.password);
    if (data.id_proof)
      formData.append("id_proof", data.id_proof[0]);

    try {
      if (!users) {
        await addUser(formData);
         await mutate(); 
      } else {
        await updateUser(Number(users.user_id), formData);
         await mutate(); 
      }
      reset();
      if (fileInputRef.current) fileInputRef.current.value = "";
      navigate("/dashboard/user-list");
    } catch (err) {
      console.error("Failed to submit user:", err);
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full p-10 rounded-xl flex flex-col gap-6"
        >
          <h2 className="text-2xl font-bold text-[var(--primary)]">
            {users ? "Edit User" : "Create User"}
          </h2>

          {/* Username */}
          <FormField
            control={control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter Username" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Password */}
          <FormField
            control={control}
            name="password"
            disabled={users ? true : false}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter Password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter Email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter Phone Number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ID Proof */}
          <FormField
            control={control}
            name="id_proof"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID Proof</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => field.onChange(e.target.files)}
                    ref={(el) => {
                      field.ref(el);
                      fileInputRef.current = el;
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Label>Roles</Label>
          {roles && (
            <RoleForm
              roles={roles}
              control={control}
              setValue={form.setValue}
            />
          )}

          <Label>Permission</Label>
          {Permissions && (
            <PermissionForm
              Permissions={Permissions}
              control={control}
              watch={form.watch}
            />
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-1/3 self-center"
          >
            {isSubmitting ? "Submitting..." : users ? "Update" : "Create"}
          </Button>
        </form>
      </Form>
    </section>
  );
}

