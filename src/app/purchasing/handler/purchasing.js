import { BASE_URL } from "@/schema/secret";
import axios from "axios";
import { getCookie } from "@/utils/cookies";
const token = getCookie("token");

export async function getProduk() {
  try {
    const response = await axios.get(`${BASE_URL}/produk/`, {});
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getTransaksi() {
  try {
    const response = await axios.get(`${BASE_URL}/transaksi/`, {
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

export async function createTransaksi(value) {
  try {
    const response = await axios.post(`${BASE_URL}/transaksi/`, value, {
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



export async function changeStatus(id, status) {
  try {
    const response = await axios.put(
      `${BASE_URL}/transaksi/status/${id}`,
      status,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}
