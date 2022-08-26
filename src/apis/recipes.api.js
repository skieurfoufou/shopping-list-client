import axios from "axios";
import env from "../config/env";

export const getAllRecipes = async ({ subCategory, q }) => {
  try {
    const parameters = [];
    if (subCategory) {
      parameters.push(`subCategory=${subCategory}`);
    }
    if (q) {
      parameters.push(`q=${q}`);
    }

    const url = `${env.SERVER_URL}/recipes${
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

export const getOneRecipe = async (id) => {
  try {
    const url = `${env.SERVER_URL}/recipes/${id}`;
    console.log(url);
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};

export const updateRecipe = async (id, recipe, token) => {
  try {
    const url = `${env.SERVER_URL}/recipes/${id}`;
    console.log(url);
    const headers = createHeaders({ token });
    const res = await axios.put(url, recipe, { headers });
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};

export const createRecipe = async (newRecipe, token) => {
  try {
    const url = `${env.SERVER_URL}/recipes`;
    const headers = createHeaders({ token });
    const res = await axios.post(url, newRecipe, { headers });
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};

export const deleteRecipe = async (id, token) => {
  try {
    const url = `${env.SERVER_URL}/recipes/${id}`;
    const headers = createHeaders({ token });
    const res = await axios.delete(url, { headers });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const createHeaders = ({ token }) => {
  return {
    Authorization: "Bearer " + token,
  };
};
