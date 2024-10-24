import api from "../../api";

export default async function getAndCreateWeatherForecast(locationData) {
    try {
        console.log(locationData);
        return await api.post("/api/v1/weather-forecast/search-or-create-by-location", locationData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        throw error;
    }
}