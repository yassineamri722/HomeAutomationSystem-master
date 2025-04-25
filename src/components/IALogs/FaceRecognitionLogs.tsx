import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

interface FaceLog {
  timestamp: string;
  imageUrl: string;
  personName: string;
  status: "AUTHORIZED" | "UNAUTHORIZED";
}

// Connexion au WebSocket du backend Flask
const socket = io("http://nano-ddns.ddns.net:5000");

const FaceRecognitionLogs: React.FC = () => {
  const [logs, setLogs] = useState<FaceLog[]>([]);

  // Fonction pour récupérer les logs depuis localStorage
  const fetchLogsFromLocalStorage = () => {
    const logsFromStorage = localStorage.getItem("faceRecognitionLogs");
    if (logsFromStorage) {
      try {
        return JSON.parse(logsFromStorage);
      } catch (error) {
        console.error("Erreur de parsing des logs depuis localStorage", error);
        return []; // Retourne un tableau vide si les données sont invalides
      }
    }
    return [];
  };

  // Fonction pour stocker un log dans localStorage
  const saveLogToLocalStorage = (newLog: FaceLog) => {
    const currentLogs = fetchLogsFromLocalStorage();
    const updatedLogs = [newLog, ...currentLogs].slice(0, 20); // Limiter à 20 logs
    localStorage.setItem("faceRecognitionLogs", JSON.stringify(updatedLogs));
    setLogs(updatedLogs); // Mettre à jour l'état avec les logs
  };

  useEffect(() => {
    // Charger les logs initiaux depuis localStorage lors du montage du composant
    const initialLogs = fetchLogsFromLocalStorage();
    setLogs(initialLogs);

    // Lorsque l'événement 'face_recognized' est reçu du backend
    socket.on("face_recognized", (data: any) => {
      // Vérifie si les données nécessaires existent
      if (!data.image || !data.name) {
        console.error("Données de reconnaissance faciale invalides:", data);
        return; // Ne pas traiter si les données sont incomplètes
      }

      const log: FaceLog = {
        timestamp: new Date().toISOString(), // ou utiliser `data.timestamp` si disponible
        imageUrl: `data:image/jpeg;base64,${data.image}`, // Image encodée en base64
        personName: data.name || "Unknown", // Si le nom est fourni
        status: data.name && data.name !== "Unknown" ? "AUTHORIZED" : "UNAUTHORIZED", // Autorisé si un nom est trouvé
      };

      // Sauvegarder le log dans localStorage et mettre à jour l'état
      saveLogToLocalStorage(log);
    });

    // Nettoyer l'écouteur lorsqu'on quitte le composant
    return () => {
      socket.off("face_recognized");
    };
  }, []);

  return (
    <div className="p-6 bg-white rounded-2xl shadow max-h-[600px] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Face Recognition Logs</h2>
      <div className="space-y-4">
        {logs.map((log, index) => (
          <div key={index} className="flex items-center gap-4 border-b pb-4">
            {/* Vérification de l'image avant l'affichage */}
            {log.imageUrl ? (
              <img
                src={log.imageUrl}
                alt="Captured face"
                className="w-16 h-16 rounded-full border"
              />
            ) : (
              <span>Image invalide</span> // Message d'erreur si l'image est invalide
            )}
            <div>
              <p className="font-semibold">{log.personName}</p>
              <p className="text-sm text-gray-500">
                {new Date(log.timestamp).toLocaleString()}
              </p>
              <span
                className={`text-xs font-semibold ${log.status === "AUTHORIZED"
                    ? "text-green-600"
                    : "text-red-500"
                  }`}
              >
                {log.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaceRecognitionLogs;
