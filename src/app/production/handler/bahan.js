import { BASE_URL } from "@/schema/secret";
import axios from "axios";
import { getCookie } from "@/utils/cookies";
const token = getCookie("token");

export async function getBahan() {
  try {
    const response = await axios.get(`${BASE_URL}/bahan/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getInventory() {
  try {
    const response = await axios.get(`${BASE_URL}/bahan/inventory/`, {
      headers : {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}


export async function selectBahan(id) {
  try {
    const response = await axios.get(`${BASE_URL}/bahan/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function addBahan(value) {
  try {
    console.log(value);
    const response = await axios.post(`${BASE_URL}/bahan/`, value, {
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

export async function updateBahan(id, value) {
  try {
    console.log(id, value);
    const response = await axios.put(`${BASE_URL}/bahan/${id}`, value, {
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

export async function addInventory(id, value) {
  try {
    console.log(id, value);
    const response = await axios.put(`${BASE_URL}/bahan/inventory/${id}`, value, {
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

export async function deleteBahan(id) {
  try {
    const response = await axios.delete(`${BASE_URL}/bahan/${id}`, {
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
