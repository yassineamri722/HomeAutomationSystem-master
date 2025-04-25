
import React from "react";
import RLLogs from "../../components/IALogs/RlLogs";

const RlLogsPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">RL Logs Monitoring</h1>
      <RLLogs />
    </div>
  );
};

export default RlLogsPage;
