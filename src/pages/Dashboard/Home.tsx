import { useState, useEffect } from "react";
import axios from "axios";
import RLStatus from "../../components/smarthome/RLStatus";
import FaceDetected from "../../components/smarthome/FaceDetected"; // Import FaceDetected component
import TemperatureWidget from "../../components/smarthome/TemperatureWidget"; // Import TemperatureWidget component
import SummaryWidgets from "../../components/smarthome/SummaryWidgets";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  const [indoorTemp, setIndoorTemp] = useState<number | null>(null);
  const [outdoorTemp, setOutdoorTemp] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:8000/get-action", {
          state: [25.0, 0, 1],
        });

        const {
          indoor_temperature = 0,
          outdoor_temperature = 0,
          humidity: fetchedHumidity = 0,
        } = response.data || {};

        setIndoorTemp(indoor_temperature);
        setOutdoorTemp(outdoor_temperature);
        setHumidity(fetchedHumidity);
      } catch (error: any) {
        setError("Error fetching data from the API.");
        console.error("API Error:", error.response || error.message);
      }
    };

    fetchData();
  }, []);

  if (indoorTemp === null || outdoorTemp === null || humidity === null) {
    return <div className="loading">Loading data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
      <PageMeta
        title="Smart Home Dashboard"
        description="Monitor and control your smart home features like temperature, humidity, RL status, face detection, and more!"
      />

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <RLStatus />

          {/* Integrating FaceDetected component */}
          <FaceDetected />

          {/* Integrating TemperatureWidget component */}
          <TemperatureWidget />

          {/* You can add more widgets here if needed */}
        </div>

        <div className="col-span-12 xl:col-span-5">
          <SummaryWidgets />
        </div>
      </div>
    </>
  );
}
