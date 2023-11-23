import { RegisterUser } from "./RegisterUser";

export type RegisterEmployer = RegisterUser & {
  intrestedList: string[];
  about: string;
};
