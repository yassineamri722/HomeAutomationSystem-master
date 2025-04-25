import React, { useEffect, useState } from "react";

interface RLActionData {
  timestamp: number;
  action: {
    ac: number;
    window: number;
  };
  reward: number;
  indoor_temperature: number;
  outdoor_temperature: number | null;
  rain: boolean;
  humidity: number;
  energy_saved_percentage: number;
}

interface RLActionLog {
  timestamp: string;
  acStatus: "ON" | "OFF";
  acTemp: number;
  windowStatus: "OPEN" | "CLOSED";
}

const RLLogs: React.FC = () => {
  const [logs, setLogs] = useState<RLActionLog[]>([]);

  // ✅ Charger les logs depuis localStorage au montage
  useEffect(() => {
    const savedLogs = localStorage.getItem("rl_logs");
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  // ✅ Sauvegarder les logs dans localStorage à chaque mise à jour
  useEffect(() => {
    localStorage.setItem("rl_logs", JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    const ws = new WebSocket("wss://myrl-hpgxb5gaezembecs.canadacentral-01.azurewebsites.net/ws");

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      if (event.data === "ping") return;

      const data: RLActionData = JSON.parse(event.data);
      const timestamp = new Date(data.timestamp * 1000).toISOString();

      const acStatus = data.action.ac === 1 ? "ON" : "OFF";
      const acTemp = acStatus === "ON" ? Math.round(data.indoor_temperature) : 0;
      const windowStatus = data.action.window === 1 ? "OPEN" : "CLOSED";

      const newLog: RLActionLog = {
        timestamp,
        acStatus,
        acTemp,
        windowStatus,
      };

      setLogs((prev) => [newLog, ...prev].slice(0, 20));
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="p-6 bg-white rounded-2xl shadow max-h-[500px] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Reinforcement Learning Logs</h2>
      {logs.length === 0 ? (
        <p className="text-gray-500 text-sm">Waiting for RL actions...</p>
      ) : (
        logs.map((log, idx) => (
          <div key={idx} className="mb-3 border-b pb-2">
            <p className="text-sm text-gray-600">
              <strong>{new Date(log.timestamp).toLocaleTimeString()}</strong>
            </p>
            <p className="text-sm">
              AC:{" "}
              <span className={log.acStatus === "ON" ? "text-blue-600" : "text-gray-500"}>
                {log.acStatus}
              </span>{" "}
              {log.acStatus === "ON" && `(Temp: ${log.acTemp}°C)`}
            </p>
            <p className="text-sm">
              Window:{" "}
              <span className={log.windowStatus === "OPEN" ? "text-green-600" : "text-gray-600"}>
                {log.windowStatus}
              </span>
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default RLLogs;
