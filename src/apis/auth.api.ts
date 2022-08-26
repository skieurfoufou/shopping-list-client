import axios from "axios";
import env from "../config/env";

export const login = async (loginDetails: {
  email: string;
  password: string;
}) => {
  try {
    const url = `${env.SERVER_URL}/login`;
    const res = await axios.post(url, loginDetails);
    return res.data;
  } catch (err: any) {
    console.error(err);
    throw new Error(err.message);
  }
};

export const createUser = async (newUser: {
  email: string;
  password: string;
}) => {
  try {
    const url = `${env.SERVER_URL}/register`;
    const res = await axios.post(url, newUser);
    return res.data;
  } catch (err: any) {
    console.error(err);
    throw new Error(err.message);
  }
};
