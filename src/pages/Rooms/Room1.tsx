import React from "react";
import LiveStream from "../../components/room/LiveStream";
import TemperatureDisplay from "../../components/room/TemperatureDisplay";
import PresenceIndicator from "../../components/room/PresenceIndicator";
import DisplayLight from "../../components/room/DisplayLight";
import DoorToggle from "../../components/room/DoorToggle";
import WindowToggle from "../../components/room/WindowToggle";

const Room1: React.FC = () => {
  const socketUrl = ""; // WebSocket for Room1

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Room 1 Monitoring</h1>
      <LiveStream />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TemperatureDisplay temperature={23} />
        <PresenceIndicator isPresent={true} />
        <DoorToggle socketUrl={socketUrl} />
        <WindowToggle socketUrl={socketUrl} />
        <DisplayLight socketUrl={socketUrl} />
      </div>
    </div>
  );
};

export default Room1;
