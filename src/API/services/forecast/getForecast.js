import api from "../../api";

export default async function getWeatherForecast(locationData) {
    try {
        console.log("Location data result: ", locationData);
        return await api.post("/api/v1/weather-forecast/search-by-location", locationData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        throw error;
    }
}