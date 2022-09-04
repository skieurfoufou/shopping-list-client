import axios from "axios";
import env from "../config/env";
import { User } from "../types/UserType";

export const createUser = async (newUser: User) => {
  try {
    const url = `${env.SERVER_URL}/register`;
    const res = await axios.post(url, newUser);
    return res.data;
  } catch (err: any) {
    console.error(err);
    throw new Error(err.message);
  }
};

export const getUserByID = async (id: string): Promise<User> => {
  try {
    const url = `${env.SERVER_URL}/users/${id}`;
    console.log(url);
    const res = await axios.get(url);
    return res.data;
  } catch (err: any) {
    console.error(err);
    throw new Error(err.message);
  }
};

export const getAllUsers = async (obj: { name?: string; q?: string }) => {
  try {
    const parameters = [];
    if (obj.name) {
      parameters.push(`name=${obj.name}`);
    }
    if (obj.q) {
      parameters.push(`q=${obj.q}`);
    }

    const url = `${env.SERVER_URL}/users${
      parameters.length > 0 ? "?" + parameters.join("&") : ""
    }`;
    console.log(url);
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
