import React, { useState, useEffect, useRef } from "react";

type Props = {
  socketUrl: string;
};

const DoorToggle: React.FC<Props> = ({ socketUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(socketUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("🚪 WebSocket connected for DoorToggle");
    };

    ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.action === "open_door") {
          setIsOpen(true);
        } else if (data.action === "close_door") {
          setIsOpen(false);
        }
      } catch (err) {
        console.error("❌ Failed to parse door data:", e.data);
      }
    };

    ws.onclose = () => {
      console.log("🔌 WebSocket disconnected (DoorToggle)");
    };

    return () => {
      ws.close();
    };
  }, [socketUrl]);

  const toggleDoor = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const action = isOpen ? "close_door" : "open_door";
      wsRef.current.send(JSON.stringify({ action }));
    } else {
      console.warn("⚠️ WebSocket not connected");
    }
  };

  return (
    <div className="p-4 rounded-2xl bg-white shadow flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <div>
          <p className="text-sm text-gray-500">Door</p>
          <p className="text-xl font-bold">{isOpen ? "Open" : "Closed"}</p>
        </div>
      </div>
      <button
        onClick={toggleDoor}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
      >
        {isOpen ? "Close Door" : "Open Door"}
      </button>
    </div>
  );
};

export default DoorToggle;
