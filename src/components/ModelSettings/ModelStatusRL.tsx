import { useEffect, useState } from "react";
import axios from "axios";

const ModelStatusRL = () => {
    const [status, setStatus] = useState("unknown");

    const checkRLStatus = async () => {
        try {
            const res = await axios.get("https://myrl-hpgxb5gaezembecs.canadacentral-01.azurewebsites.net/");
            
            // Adapte cette logique selon la vraie réponse
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
        checkRLStatus();
        const interval = setInterval(checkRLStatus, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex justify-between items-center border-b pb-2">
            <span className="font-medium">IA Reinforcement Learning</span>
            <span className={`text-sm font-semibold ${status === "online" ? "text-green-600" : "text-red-500"}`}>
                {status}
            </span>
        </div>
    );
};

export default ModelStatusRL;
