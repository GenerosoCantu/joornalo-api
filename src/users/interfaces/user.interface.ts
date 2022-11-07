import { NumericLiteral } from "@babel/types";
import { Exclude } from 'class-transformer';

export class User {
  id?: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  phone: string;
  reg_time: Date;
  login_fail: number;
  locked: boolean;
  verified: boolean;
  status: string;
  sections: string[];
  modules: string[];

  @Exclude({ toPlainOnly: true })
  password: string;
}

// export interface UserPass {
//   id?: string;
//   email: string;
//   role: string;
//   firstName: string;
//   lastName: string;
//   password: string;
//   phone: string;
//   reg_time: Date;
//   login_fail: number;
//   locked: boolean;
//   verified: boolean;
//   status: string;
// }

export interface UserProfile {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
}

export interface Permissions {
  permissions: string[];
}