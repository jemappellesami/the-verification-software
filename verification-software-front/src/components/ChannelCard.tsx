function ChannelCard() {
  return (
    <div className="section">
      <h4>Communication channel</h4>
      <div className="channel-card">
        <div>
          <p className="channel-title">Quantum channel status</p>
          <p className="helper">
            Synchronize qubits and classical metadata before launch.
          </p>
        </div>
        <button className="ghost">Recalibrate</button>
      </div>
    </div>
  );
}

export default ChannelCard;
