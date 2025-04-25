// src/components/LiveStream.jsx


const LiveStream = () =>
{
  return (
    <div className="w-full aspect-video bg-black rounded-2xl shadow-lg overflow-hidden">
      {/* Example using iframe or video src */}
      <iframe
        src="https://your-camera-stream-link"
        title="Live Stream"
        className="w-full h-full"
        allowFullScreen
      />
    </div>
  );
};

export default LiveStream;
