"use client";

import axios from "axios";
import { BASE_URL } from "@/schema/secret";
import { setCookie, getCookie } from "@/utils/cookies"; // Import setCookie
import toast from "react-hot-toast";

const token = getCookie("token");    

export default async function login(username, password, router) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      username,
      password,
    });
    const data = response.data;
    if (data.status === "error") {
      return data.message;
    }

    const { token, user } = data.data;
    const { role } = user;
    setCookie("token", token);

    if (role === "ADMIN") {
      router.push("/admin");
    } else if (role === "PRODUCTION") {
      router.push("/production");
    } else if (role === "FINANCE") {
      router.push("/finance");
    } else if (role === "PURCHASING") {
      router.push("/purchasing");
    } else {
      if (data.status === "error") {
        return data.message;
      }
    }
  } catch (error) {
    toast.error("Gagal login");
    console.log(error);
    return null;
  }
}

export async function forgetPassword(email, password) {
  try {
    const response = await axios.put(`${BASE_URL}/auth/reset-password`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function resetPassword(id, password) {
  try {
    const response = await axios.put(`${BASE_URL}/auth/password/${id}`, {
      password,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    if (data.status === "error") {
      return data.message;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAllUser() {
  try {
    const response = await axios.post(`${BASE_URL}/auth/user`, {}, {
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

export async function register(value) {
  const token = getCookie("token");
  console.log(value);
  
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, value, {
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
