import axios from "axios";
import env from "../config/env";

export const createList = async (
  newList: { name: string; listDetails: [] },
  token: string
) => {
  try {
    const url = `${env.SERVER_URL}/lists`;
    const headers = createHeaders({ token });
    const res = await axios.post(url, newList, { headers });
    return res.data;
  } catch (err: any) {
    console.error(err);
    throw new Error(err.message);
  }
};

export const updateList = async (
  id: string,
  list: { name: string; listDetails: [] },
  token: string
) => {
  try {
    const url = `${env.SERVER_URL}/lists/${id}`;
    console.log(url);
    const headers = createHeaders({ token });
    const res = await axios.put(url, list, { headers });
    return res.data;
  } catch (err: any) {
    console.error(err);
    throw new Error(err.message);
  }
};

export const getOneList = async (id: string) => {
  try {
    const url = `${env.SERVER_URL}/lists/${id}`;
    console.log(url);
    const res = await axios.get(url);
    return res.data;
  } catch (err: any) {
    console.error(err);
    throw new Error(err.message);
  }
};

export const getAllLists = async (obj: { name: string; q: string }) => {
  try {
    const parameters = [];
    if (obj.name) {
      parameters.push(`name=${obj.name}`);
    }
    if (obj.q) {
      parameters.push(`q=${obj.q}`);
    }

    const url = `${env.SERVER_URL}/lists${
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

const createHeaders = ({ token }: { token: string }) => {
  return {
    Authorization: "Bearer " + token,
  };
};
