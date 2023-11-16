import { RegisterUser } from "./RegisterUser";

export type RegisterEmployer = RegisterUser & {
  interestedList: string[];
  about: string;
};