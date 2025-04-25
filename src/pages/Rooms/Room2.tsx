import React from "react";
import LiveStream from "../../components/room/LiveStream";
import TemperatureDisplay from "../../components/room/TemperatureDisplay";
import PresenceIndicator from "../../components/room/PresenceIndicator";
import DisplayLight from "../../components/room/DisplayLight";
import DoorToggle from "../../components/room/DoorToggle";
import WindowToggle from "../../components/room/WindowToggle";

const Room2: React.FC = () => {
  const socketUrl = "ws://192.168.1.74:8000/ws"; // Shared WebSocket URL for both rooms

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Room 2 Monitoring</h1>

      <LiveStream />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TemperatureDisplay temperature={21} />
        <PresenceIndicator isPresent={false} />
        <DoorToggle socketUrl={socketUrl} /> {/* No roomId needed */}
        <WindowToggle socketUrl={socketUrl} /> {/* No roomId needed */}
        <DisplayLight socketUrl={socketUrl} /> {/* No roomId needed */}
      </div>
    </div>
  );
};

export default Room2;
