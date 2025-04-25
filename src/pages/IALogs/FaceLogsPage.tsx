// src/pages/FaceLogsPage.tsx
import React from "react";
import FaceRecognitionLogs from "../../components/IALogs/FaceRecognitionLogs";

const FaceLogsPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Face Recognition Monitoring</h1>
      <FaceRecognitionLogs />
    </div>
  );
};

export default FaceLogsPage;
