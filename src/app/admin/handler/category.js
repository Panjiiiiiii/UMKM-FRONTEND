import { BASE_URL } from "@/schema/secret";
import axios from "axios";

export async function getCategory() {
  try {
    const response = await axios.get(`${BASE_URL}/category/`, {});
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getCategoryById(id) {
  try {
    const response = await axios.get(`${BASE_URL}/category/${id}`, {});
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createCategory(Kategori) {
  try {
    const response = await axios.post(`${BASE_URL}/category/`, { Kategori });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function updateCategory(id, Kategori) {
  try {
    const response = await axios.put(`${BASE_URL}/category/${id}`, {
      Kategori,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function deleteCategory(id) {
  try {
    const response = await axios.delete(`${BASE_URL}/category/${id}`, {});
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
