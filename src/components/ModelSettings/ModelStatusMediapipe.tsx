import { useEffect, useState } from "react";
import axios from "axios";

const ModelStatusMediapipe = () =>
{
    const [status, setStatus] = useState("unknown");

    const pingModel = async () =>
    {
        try
        {
            const res = await axios.get("http://localhost:5000/ping/mediapipe");
            setStatus(res.data.status === "online" ? "online" : "offline");
        } catch
        {
            setStatus("offline");
        }
    };

    useEffect(() =>
    {
        pingModel();
        const interval = setInterval(pingModel, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex justify-between items-center border-b pb-2">
            <span className="font-medium">Mediapipe</span>
            <span className={`text-sm font-semibold ${status === "online" ? "text-green-600" : "text-red-500"}`}>
                {status}
            </span>
        </div>
    );
};

export default ModelStatusMediapipe;
