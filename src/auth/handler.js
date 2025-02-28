"use client";

import axios from "axios";
import { BASE_URL } from "@/schema/secret";
import { setCookie } from "@/utils/cookies"; // Import setCookie

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
    console.log(error);
    return null;
  }
}
