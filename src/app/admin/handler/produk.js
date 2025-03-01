import { BASE_URL } from "@/schema/secret";
import Cookies from "js-cookie";
import axios from "axios";

export async function getProduk() {
  try {
    const response = await axios.get(`${BASE_URL}/produk/`, {});

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProdukById(id) {
  try {
    const response = await axios.get(`${BASE_URL}/produk/${id}`, {});

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createProduk({ value }) {
  try {
    const token = Cookies.get("token");

    const response = await axios.post(`${BASE_URL}/produk/`, value, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateProduk(id, { value }) {
  try {
    const formData = new FormData();
    formData.append("value", value);

    const token = Cookies.get("token");
    const response = await axios.put(`${BASE_URL}/produk/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteProduk(id) {
  try {
    const token = Cookies.get("token");
    const response = await axios.delete(`${BASE_URL}/produk/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
