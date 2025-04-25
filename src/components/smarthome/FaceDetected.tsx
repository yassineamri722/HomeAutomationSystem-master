import { useEffect, useState } from "react";

interface FaceLog {
  imageUrl?: string;
  personName?: string;
  timestamp: string;
}

const FaceDetected: React.FC = () => {
  const [recentFaces, setRecentFaces] = useState<FaceLog[]>([]);

  useEffect(() => {
    const logsFromStorage = localStorage.getItem("faceRecognitionLogs");
    if (logsFromStorage) {
      try {
        const parsedLogs: FaceLog[] = JSON.parse(logsFromStorage);
        setRecentFaces(parsedLogs.slice(0, 3)); // Only keep the latest 3
      } catch (error) {
        console.error("Failed to parse face logs from localStorage:", error);
      }
    }
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h3 className="text-lg font-semibold mb-4">Recent Faces Detected</h3>
      <div className="space-y-4">
        {recentFaces.length > 0 ? (
          recentFaces.map((face, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 border-b pb-2 last:border-b-0"
            >
              <img
                src={face.imageUrl || "placeholder-image.jpg"}
                alt={`Face ${index + 1}`}
                className="w-16 h-16 rounded-full object-cover border"
              />
              <div>
                <p className="font-medium">
                  {face.personName || (
                    <span className="text-red-500">Unknown</span>
                  )}
                </p>
                <p className="text-sm text-gray-500">
                  {face.timestamp
                    ? new Date(face.timestamp).toLocaleString()
                    : "Unknown Date"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No faces detected yet.</p>
        )}
      </div>
    </div>
  );
};

export default FaceDetected;
