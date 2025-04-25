import React, { useState, useEffect } from "react";
import { SquareArrowOutUpRight, Square } from "lucide-react";

type Props = {
  socketUrl: string;
};

const DisplayWindow: React.FC<Props> = ({ socketUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  // WebSocket connection to listen for actions from the model
  useEffect(() => {
    const ws = new WebSocket(socketUrl);

    ws.onmessage = (e) => {
      try {
        console.log("📨 window message:", e.data); // Debugging: log the raw message

        const message = typeof e.data === "string" ? e.data : "";
        if (message === "open_window") {
          console.log("🪟 Window opened by the model");
          setIsOpen(true);
        } else if (message === "close_window") {
          console.log("🪟 Window closed by the model");
          setIsOpen(false);
        } else {
          console.log("❓ Unknown window command:", message);
        }
      } catch (error) {
        console.log("⚠️ Error handling message:", error);
      }
    };

    return () => {
      ws.close();
    };
  }, [socketUrl]);

  return (
    <div className="p-4 rounded-2xl bg-white shadow flex flex-col gap-2">
      <div className="flex items-center gap-4">
        {isOpen ? (
          <SquareArrowOutUpRight className="text-blue-500 w-8 h-8" />
        ) : (
          <Square className="text-gray-500 w-8 h-8" />
        )}
        <div>
          <p className="text-sm text-gray-500">Window</p>
          <p className="text-xl font-bold">{isOpen ? "Open" : "Closed"}</p>
        </div>
      </div>
    </div>
  );
};

export default DisplayWindow;
