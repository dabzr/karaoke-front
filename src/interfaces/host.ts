import { IPlan } from "./plan";

export interface ApiHostRoom {
  "is_premium": boolean;
  "max_room_size": number;
  "name"?: string;
  "password"?: string;
  "code"?: string;
  "timeoutSeconds"?: string;
};

export interface ApiHost {
  "email": string;
  "id": string;
  "type": string;
  "premiumLastPayment": string;
};

export interface IHost {
  "email": string;
  "plan": IPlan;
};
