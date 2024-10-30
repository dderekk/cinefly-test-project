export interface AuthUserModel {
  id: string;
  username: string;
  role: "admin" | "editor";
}
