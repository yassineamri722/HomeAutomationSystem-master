
import ModelStatusFace from "../components/ModelSettings/ModelStatusFace";
import ModelStatusMediapipe from "../components/ModelSettings/ModelStatusMediapipe";
import ModelStatusRL from "../components/ModelSettings/ModelStatusRL";

const ModelSettings = () => {
    return (
        <div className="p-4 bg-white rounded shadow-md space-y-4">
            <h3 className="text-lg font-semibold">Model Settings</h3>
            <ModelStatusFace />
            <ModelStatusMediapipe />
            <ModelStatusRL />
        </div>
    );
};

export default ModelSettings;
