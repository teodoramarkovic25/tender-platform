import { BaseModel } from "./base.model";

export class UserModel extends BaseModel {
  id: number;
  name: string;
  email: string;
  role: string;
  isEmailVerified: string;
}