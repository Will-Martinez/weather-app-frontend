import api from "../../api";

export default async function getLocationsData() {
    try {
        return await api.get("/api/v1/weather-forecast/list/locations");
    } catch (error) {
        throw error;
    }
}