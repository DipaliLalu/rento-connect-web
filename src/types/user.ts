export type User= {
  user_id?: string | null;
  username?: string;
  password?: string;
  mobile?: string;
  email?: string;
  id_proof?: string;
  roles: string[];
  permission: string[];
};

export type Permissions={
  permission_id?:string;
  permission_name?:string;
}

export type Roles={
  role_id?:string;
  role_name?:string;
}
