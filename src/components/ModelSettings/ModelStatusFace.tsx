import { useEffect, useState } from "react";
import axios from "axios";

const ModelStatusFace = () => {
    const [status, setStatus] = useState("unknown");

    const pingModel = async () => {
        try {
            const res = await axios.get("http://nano-ddns.ddns.net:5000/check-model");
            // Si le backdzd répond avec un status 200 → modèle en ligne ok
            if (res.status === 200) {
                setStatus("online");
            } else {
                setStatus("offline");
            }
        } catch (err) {
            setStatus("offline");
        }
    };

    useEffect(() => {
        pingModel();
        const interval = setInterval(pingModel, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex justify-between items-center border-b pb-2">
            <span className="font-medium">Face Recognition</span>
            <span className={`text-sm font-semibold ${status === "online" ? "text-green-600" : "text-red-500"}`}>
                {status}
            </span>
        </div>
    );
};

export default ModelStatusFace;
