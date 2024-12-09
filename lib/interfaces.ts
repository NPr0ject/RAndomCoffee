import { Context } from "https://deno.land/x/grammy@v1.32.0/mod.ts";

export interface UserInfo {
  id: number;
  name: string;
  age: number;
  interests: string[];
  time: number;
  //image: file;
  coffee: string;
  done: boolean;
  state: string;
}



export type MyContext = Context & {
  config: UserInfo;
};
