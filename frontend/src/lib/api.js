import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API });

export async function fetchWedding() {
    const { data } = await api.get("/wedding");
    return data;
}

export async function listGuests() {
    const { data } = await api.get("/guests");
    return data;
}

export async function createGuest(name, message) {
    const { data } = await api.post("/guests", { name, message });
    return data;
}

export async function getGuest(slug) {
    const { data } = await api.get(`/guests/${slug}`);
    return data;
}

export async function deleteGuest(slug) {
    const { data } = await api.delete(`/guests/${slug}`);
    return data;
}
