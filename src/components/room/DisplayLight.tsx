import React, { useState, useEffect } from "react";
import { Lightbulb, LightbulbOff } from "lucide-react";

type Props = {
  socketUrl: string;
};

const DisplayLight: React.FC<Props> = ({ socketUrl }) => {
  const [isOn, setIsOn] = useState(false);

  // WebSocket connection to listen for actions from the model
  useEffect(() => {
    const ws = new WebSocket(socketUrl);

    // Handle incoming messages from the model
    ws.onmessage = (e) => {
      try {
        console.log("📨 ghaith:", e.data); // Debugging: log the raw message

        const message = typeof e.data === "string" ? e.data : "";
        if ("lamp_on" == message) {
          console.log("💡 Lamp turned ON by the model");
          setIsOn(true); // Update state to reflect the action
        } else if ("lamp_off" == message) {
          console.log("💡 Lamp turned OFF by the model");
          setIsOn(false); // Update state to reflect the
        } else {
          console.log("❓ Unknown command received from the model");
        }
      } catch (error) {
        console.log("Raw message was:",error);
      }
    };

    // Clean up the WebSocket connection when the component is unmounted
    return () => {
      ws.close();
    };
  }, [socketUrl]);

  return (
    <div className="p-4 rounded-2xl bg-white shadow flex flex-col gap-2">
      <div className="flex items-center gap-4">
        {isOn ? <Lightbulb className="text-yellow-500 w-8 h-8" /> : <LightbulbOff className="text-gray-500 w-8 h-8" />}
        <div>
          <p className="text-sm text-gray-500">Light</p>
          <p className="text-xl font-bold">{isOn ? "On" : "Off"}</p>
        </div>
      </div>
    </div>
  );
};

export default DisplayLight;
