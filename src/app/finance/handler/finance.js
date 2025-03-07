import { BASE_URL } from "@/schema/secret";
import axios from "axios";
import { getCookie } from "@/utils/cookies";
const token = getCookie("token");

export async function getTransaksi() {
  try {
    const response = await axios.get(`${BASE_URL}/finance/`, {
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

export async function getDetailTransaksi(id) {
    try {
      const response = await axios.get(`${BASE_URL}/finance/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
  
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

export async function soldProduk() {
  try {
    const response = await axios.get(`${BASE_URL}/finance/produk`, {
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

export async function createReport() {
  try {
    const response = await axios.post(`${BASE_URL}/finance/report`, {}, {
        headers : {
            Authorization : `Beaer ${token}`
        }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
