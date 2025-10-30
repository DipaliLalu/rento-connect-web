import { useMemo } from "react";
import { FormField, FormItem, FormControl, FormLabel } from "./ui/form";
import { Checkbox } from "./ui/checkbox";
import type { Permissions } from "../types/user";
import type { Control, UseFormWatch } from "react-hook-form";

type PermissionFormProps = {
  Permissions: Permissions[];
  control: Control<any>;
  watch?: UseFormWatch<any>;
};

export default function PermissionForm({ Permissions, control }: PermissionFormProps) {
  // const selectedPermissions: string[] = watch("permission") || [];

  // Group permissions by prefix
  const groupedPermissions = useMemo(() => {
    const groups: Record<string, Permissions[]> = {};
    Permissions.forEach((perm) => {
      if (!perm.permission_name) return;
      const [group] = perm.permission_name.split(".");
      if (!groups[group]) groups[group] = [];
      groups[group].push(perm);
    });
    return groups;
  }, [Permissions]);

  return (
    <FormField
      control={control}
      name="permission"
      render={({ field }) => (
        <div className="space-y-4">
          {Object.entries(groupedPermissions).map(([groupName, perms]) => (
            <div key={groupName} className="border p-3 rounded-lg">
              <h3 className="font-semibold capitalize mb-2">{groupName}</h3>
              <div className="flex flex-wrap gap-3">
                {perms.map((perm) => {
                  const label = perm.permission_name?.split(".")[1] || "unknown";
                  const isChecked = field.value.includes(perm.permission_name);

                  return (
                    <FormItem key={perm.permission_id} className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={(checked) => {
                            const newPermissions = checked
                              ? [...field.value, perm.permission_name]
                              : field.value.filter((id: string) => id !== perm.permission_name);
                            field.onChange(newPermissions); // ✅ must use field.onChange
                          }}
                        />
                      </FormControl>
                      <FormLabel className="capitalize">{label}</FormLabel>
                    </FormItem>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    />
  );
}
