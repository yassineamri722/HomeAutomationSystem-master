import React, { useState, useEffect } from "react";
import { FaTint } from "react-icons/fa";
import axios from "axios";

const HumidityWidget: React.FC = () => {
  const [humidity, setHumidity] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getHumidityLevel = (humidity: number): string => {
    if (humidity > 70) return "High Humidity";
    if (humidity > 40) return "Moderate Humidity";
    return "Low Humidity";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:8000/get-action", {
          state: [25.0, 0, 1],
        });

        const { humidity: fetchedHumidity } = response.data;
        setHumidity(fetchedHumidity);
      } catch (error: any) {
        setError("Error fetching data from the API.");
        console.error("API Error:", error.response?.data || error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-md">
      <h3 className="text-lg font-semibold">Humidity</h3>
      <div className="flex items-center justify-between space-x-6">
        <div>
          {humidity !== null ? (
            <>
              <p className="text-sm">{getHumidityLevel(humidity)}</p>
              <p className="text-sm">Humidity: {humidity}%</p>
            </>
          ) : (
            <p className="text-sm">Loading...</p>
          )}
        </div>
        <div className="text-4xl">
          <FaTint className="text-blue-500" />
        </div>
      </div>
    </div>
  );
};

export default HumidityWidget;
