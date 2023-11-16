import { RegisterUser } from "./RegisterUser";

export type CreateEvent = RegisterUser & {
  interestedList: string[];
  about: string;
};
