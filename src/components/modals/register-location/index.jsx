import { useState } from "react";
import getAndCreateWeatherForecast from "../../../API/services/forecast/getCreateForecast";
import createLocationsByGeolocation from "../../../API/services/forecast/createLocationsByGeolocation";
import toast from 'react-hot-toast';

export default function LocationModal({ onClose }) {
    const [registrationType, setRegistrationType] = useState("name");
    const [locationName, setLocationName] = useState("");
    const [country, setCountry] = useState("");
    const [stateName, setStateName] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleRegistrationChange = (event) => {
        setRegistrationType(event.target.value);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        let locationData = {};
    
        if (registrationType === "name") {
            if (!locationName || !country || !stateName) {
                toast.error("Please fill in all fields.");
                setIsSubmitting(false); 
                return;
            }
    
            locationData = {
                location: locationName.toLowerCase(),
                country: country.toLowerCase(),
                state: stateName.toLowerCase(),
            };
        } else if (registrationType === "geolocation") {
            if (!latitude || !longitude) {
                toast.error("Please fill in both latitude and longitude.");
                setIsSubmitting(false);
                return;
            }
    
            locationData = {
                lat: parseFloat(latitude),
                lon: parseFloat(longitude)
            };
        }
    
        try {
            toast.success("Registering location and weather forecast. Please wait...");
            if (registrationType === "geolocation") {
                await createLocationsByGeolocation(locationData);
            } else {
                await getAndCreateWeatherForecast(locationData);
            }
    
            toast.success("Location registered and forecast created!");
            setTimeout(() => {
                onClose();
            }, 2000);
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };
    

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-content">
                <article className="message">
                    <div className="message-header">
                        <p>Register new location</p>
                    </div>
                    <div className="message-body">

                        <div className="field">
                            <label className="label">Registration Type</label>
                            <div className="control">
                                <div className="select is-rounded">
                                    <select value={registrationType} onChange={handleRegistrationChange}>
                                        <option value="name">Register by name</option>
                                        <option value="geolocation">Register by geolocation</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {registrationType === "name" && (
                            <>
                                <div className="field">
                                    <label className="label">Location</label>
                                    <div className="control">
                                        <input
                                            className="input is-rounded"
                                            type="text"
                                            value={locationName}
                                            onChange={(e) => setLocationName(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">Country</label>
                                    <div className="control">
                                        <input
                                            className="input is-rounded"
                                            type="text"
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">State</label>
                                    <div className="control">
                                        <input
                                            className="input is-rounded"
                                            type="text"
                                            value={stateName}
                                            onChange={(e) => setStateName(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {registrationType === "geolocation" && (
                            <>
                                <div className="field">
                                    <label className="label">Latitude</label>
                                    <div className="control">
                                        <input
                                            className="input is-rounded"
                                            type="text"
                                            value={latitude}
                                            onChange={(e) => setLatitude(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">Longitude</label>
                                    <div className="control">
                                        <input
                                            className="input is-rounded"
                                            type="text"
                                            value={longitude}
                                            onChange={(e) => setLongitude(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="field is-grouped">
                            <div className="control">
                                <button
                                    className="button is-primary is-rounded is-outlined"
                                    onClick={handleSubmit} // Chama a função handleSubmit ao clicar
                                    disabled={isSubmitting} // Desativa o botão se estiver enviando
                                >
                                    Submit
                                </button>
                            </div>
                            <div className="control">
                                <button
                                    className="button is-danger is-rounded is-outlined"
                                    onClick={onClose}
                                    disabled={isSubmitting} // Desativa o botão se estiver enviando
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
        </div>
    );
}
