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
export async function createCategory({value}) {
    try {
        const response = await axios.post(`${BASE_URL}/category/`, {value});
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function updateCategory(id, {value}) {
    try {
        const response = await axios.put(`${BASE_URL}/category/${id}`, {value});
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