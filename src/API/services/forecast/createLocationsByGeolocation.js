import api from "../../api";

export default async function createLocationsByGeolocation(geolocationData) {
    try {
        return await api.post("/api/v1/weather-forecast/create-by-geolocation", geolocationData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.log("Error: ", error.message);
        throw error;
    }
}