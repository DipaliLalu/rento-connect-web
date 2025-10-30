import { FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Checkbox } from "./ui/checkbox";
import type { Roles } from "../types/user";
import type { Control, UseFormSetValue } from "react-hook-form";

type RoleFormProps = {
  roles: Roles[];
  control: Control<any>;
  setValue?: UseFormSetValue<any>;
};

export default function RoleForm({ roles, control }: RoleFormProps) {
  return (
    <div className="space-y-3">
      <FormField
        control={control}
        name="roles"
        render={({ field }) => {
          const selectedRoles: string[] = field.value || [];

          const handleCheckboxChange = (checked: boolean, id: string) => {
            const updated = checked
              ? [...selectedRoles, id]
              : selectedRoles.filter((r) => r !== id);
            field.onChange(updated);
          };

          return (
            <div className="flex flex-wrap gap-3">
              {roles.map((role) => (
                <FormItem key={role.role_id} className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={selectedRoles.includes(role.role_name||'')}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(checked as boolean, role.role_name||'')
                      }
                    />
                  </FormControl>
                  <FormLabel>{role.role_name}</FormLabel>
                </FormItem>
              ))}
            </div>
          );
        }}
      />
    </div>
  );
}
