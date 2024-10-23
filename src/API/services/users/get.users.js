import api from "../../api";

export default async function getUsers() {
    try {
        return await api.get("/api/v1/users/list");
    } catch (error) {
        throw error;
    }
}