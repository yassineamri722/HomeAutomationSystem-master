import React, { useState, useEffect } from "react";
import { FaSun, FaCloud, FaCloudSun } from "react-icons/fa"; // Import weather icons from react-icons
import axios from "axios"; // Import axios for making API calls

interface TemperatureData {
  indoor_temperature: number;
  outdoor_temperature: number;
}

const TemperatureWidget: React.FC = () => {
  const [indoorTemp, setIndoorTemp] = useState<number | null>(null); // State to store indoor temperature
  const [outdoorTemp, setOutdoorTemp] = useState<number | null>(null); // State to store outdoor temperature
  const [error, setError] = useState<string | null>(null); // State for error handling

  // Function to determine the weather icon based on outdoor temperature
  const getWeatherIcon = (temp: number) => {
    if (temp > 30) return <FaSun className="text-yellow-500" />; // Hot (Sun)
    if (temp > 20) return <FaCloudSun className="text-yellow-300" />; // Mild (Cloud Sun)
    return <FaCloud className="text-gray-500" />; // Cool (Cloud)
  };

  // Fetch data from FastAPI when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a POST request to the FastAPI backend to get the current state
        const response = await axios.post("https://myrl-hpgxb5gaezembecs.canadacentral-01.azurewebsites.net/", {
          state: [25.0, 1, 2], // Provide your appropriate state here
        });

        // Extract the indoor and outdoor temperatures from the response
        const { indoor_temperature, outdoor_temperature }: TemperatureData = response.data;
        setIndoorTemp(indoor_temperature); // Update the indoor temperature state
        setOutdoorTemp(outdoor_temperature); // Update the outdoor temperature state
      } catch (error: any) {
        setError("Error fetching data from the API.");
        console.error("API Error:", error.response?.data || error.message); // More detailed error logging
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-md">
      <h3 className="text-lg font-semibold">Temperature</h3>
      <div className="flex items-center justify-between space-x-6">
        <div>
          {indoorTemp !== null && outdoorTemp !== null ? (
            <>
              <p className="text-sm">Indoor: {indoorTemp}°C</p>
              <p className="text-sm">Outdoor: {outdoorTemp}°C</p>
            </>
          ) : (
            <p className="text-sm">Loading...</p>
          )}
        </div>
        <div className="text-4xl">
          {outdoorTemp !== null && getWeatherIcon(outdoorTemp)} {/* Display the weather icon */}
        </div>
      </div>
    </div>
  );
};

export default TemperatureWidget;
