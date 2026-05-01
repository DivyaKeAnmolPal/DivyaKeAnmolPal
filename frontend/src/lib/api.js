import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API });

export async function fetchWedding() {
    const { data } = await api.get("/wedding");
    return data;
}
export async function listGuests() { return (await api.get("/guests")).data; }
export async function createGuest(name, message) { return (await api.post("/guests", { name, message })).data; }
export async function getGuest(slug) { return (await api.get(`/guests/${slug}`)).data; }
export async function deleteGuest(slug) { return (await api.delete(`/guests/${slug}`)).data; }

export async function listGuestbook() { return (await api.get("/guestbook")).data; }
export async function createGuestbookEntry({ name, message, photo }) {
    const fd = new FormData();
    fd.append("name", name);
    fd.append("message", message);
    if (photo) fd.append("photo", photo);
    const { data } = await api.post("/guestbook", fd, { headers: { "Content-Type": "multipart/form-data" } });
    return data;
}
export const fileUrl = (path) => path ? `${API}/files/${path}` : null;
