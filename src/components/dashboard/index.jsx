import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import toast from 'react-hot-toast';
import getLocationsData from '../../API/services/locations/getLocations';
import getAndCreateWeatherForecast from '../../API/services/forecast/getCreateForecast';
import LocationModal from '../modals/register-location';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const WeatherForecastChart = () => {
    const [locations, setLocations] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [weatherData, setWeatherData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Temperature (°C)',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 1)',
            },
            {
                label: 'Humidity (%)',
                data: [],
                backgroundColor: 'rgba(255, 159, 64, 1)',
            },
            {
                label: 'Wind Speed (km/h)',
                data: [],
                backgroundColor: 'rgba(153, 102, 255, 1)',
            },
        ],
    });
    const [currentPage, setCurrentPage] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const itemsPerPage = 20;

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await getLocationsData();
                setLocations(response.data);
            } catch (error) {
                toast.error(`Error: ${error.message}`);
            }
        };

        fetchLocations();
    }, []);

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (selectedCity) {
                const locationData = {
                    location: selectedCity.name.toLowerCase(),
                    country: selectedCity.country.toLowerCase(),
                    state: selectedCity.admin1.toLowerCase(),
                };

                try {
                    const response = await getAndCreateWeatherForecast(locationData);
                    const forecastData = response.data;

                    const temperatures = forecastData.temperature;
                    const humidities = forecastData.relativehumidity;
                    const windSpeeds = forecastData.windspeed;
                    const times = forecastData.time.map(t => new Date(t));

                    const formattedTimes = times.map(date => `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);

                    setWeatherData({
                        labels: formattedTimes,
                        datasets: [
                            {
                                label: 'Temperature (°C)',
                                data: temperatures,
                                backgroundColor: 'rgba(75, 192, 192, 1)',
                            },
                            {
                                label: 'Humidity (%)',
                                data: humidities,
                                backgroundColor: 'rgba(255, 159, 64, 1)',
                            },
                            {
                                label: 'Wind Speed (km/h)',
                                data: windSpeeds,
                                backgroundColor: 'rgba(153, 102, 255, 1)',
                            },
                        ],
                    });

                    setCurrentPage(0);
                } catch (error) {
                    toast.error(`Error fetching weather data: ${error.message}`);
                }
            }
        };

        fetchWeatherData();
    }, [selectedCity]);

    const handleCityChange = (event) => {
        const city = locations.find(loc => loc.uuid === event.target.value);
        setSelectedCity(city || null);
    };

    const paginatedWeatherData = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedData = {
            labels: weatherData.labels.slice(startIndex, endIndex),
            datasets: weatherData.datasets.map(dataset => ({
                ...dataset,
                data: dataset.data.slice(startIndex, endIndex),
            })),
        };
        return paginatedData;
    };

    const handleNextPage = () => {
        if ((currentPage + 1) * itemsPerPage < weatherData.labels.length) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handlePageSelect = (event) => {
        setCurrentPage(Number(event.target.value));
    };

    const totalPages = Math.ceil(weatherData.labels.length / itemsPerPage);
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Weather Forecast',
            },
        },
    };

    const handleRegisterLocation = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ marginBottom: '1rem' }}>
                <button onClick={handleRegisterLocation} className="button is-primary is-rounded is-outlined">
                    Register Location
                </button>
            </div>

            <select
                onChange={handleCityChange}
                value={selectedCity?.uuid || ''}
                className="select is-primary is-rounded is-small is-outlined"
            >
                <option value="" disabled>Select a city</option>
                {locations.map(location => (
                    <option key={location.uuid} value={location.uuid}>
                        {location.name}
                    </option>
                ))}
            </select>

            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <button onClick={handlePreviousPage} disabled={currentPage === 0} className="button is-primary is-rounded is-outlined" style={{ marginRight: '1rem' }}>
                    Previous
                </button>
                <label htmlFor="page-select" style={{ marginRight: '0.5rem' }}>Go to page:</label>
                <select
                    id="page-select"
                    value={currentPage}
                    onChange={handlePageSelect}
                    className="select is-small is-rounded"
                    style={{ marginRight: '1rem' }}
                >
                    {Array.from({ length: totalPages }, (_, i) => (
                        <option key={i} value={i}>
                            {i + 1}
                        </option>
                    ))}
                </select>
                <button onClick={handleNextPage} disabled={(currentPage + 1) * itemsPerPage >= weatherData.labels.length} className="button is-primary is-rounded is-outlined">
                    Next
                </button>
            </div>

            {selectedCity ? (
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <p>State: {selectedCity.admin1}</p>
                </div>
            ) : (
                <p style={{ marginTop: '1rem', color: 'red' }}>No data available</p>
            )}

            {selectedCity && (
                <>
                    <Bar data={paginatedWeatherData()} options={options} />
                </>
            )}
            {isModalOpen && <LocationModal onClose={closeModal} />}
        </div>
    );
};

export default WeatherForecastChart;
