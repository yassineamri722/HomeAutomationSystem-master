// src/components/smartHome/SummaryWidgets.jsx
const SummaryWidgets = () => {
    return (
      <div className="p-4 bg-white rounded shadow-md">
        <h3 className="text-lg font-semibold">Summary Widgets</h3>
        <div className="space-y-2">
          <p>HVAC: Running</p>
          <p>Lights: On</p>
          <p>Security: Armed</p>
        </div>
      </div>
    );
  };
  
  export default SummaryWidgets;
  