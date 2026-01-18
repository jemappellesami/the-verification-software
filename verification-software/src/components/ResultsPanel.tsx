type ResultsPanelProps = {
  isVisible: boolean;
  isStale: boolean;
  failedTestRounds: number;
  testRounds: number;
  acceptedFailures: number;
  resultBit: number | null;
};

function ResultsPanel({
  isVisible,
  isStale,
  failedTestRounds,
  testRounds,
  acceptedFailures,
  resultBit,
}: ResultsPanelProps) {
  const safeTestRounds = Math.max(testRounds, 0);
  const failureRate =
    safeTestRounds > 0 ? (failedTestRounds / safeTestRounds) * 100 : 0;
  const roundedRate = Math.round(failureRate);
  const isAccepted = failedTestRounds <= acceptedFailures;
  const verdictLabel = isAccepted ? "Accepted" : "Rejected";
  const verdictClass = isAccepted ? "verdict accepted" : "verdict rejected";

  const statusText = isVisible ? "Latest run" : "Awaiting run";

  const helperText = isStale
    ? "Parameters changed. Run Delegate and Verify again."
    : "Run Delegate and Verify to reveal failure rate and computation output.";

  return (
    <div className="panel results">
      <div className="panel-header">
        <div>
          <span className="badge tertiary">Results</span>
          <h2>Verification Results</h2>
        </div>
        <span className="status">{statusText}</span>
      </div>
      <div className="panel-body results-body">
        {!isVisible ? (
          <p className="helper">{helperText}</p>
        ) : (
          <>
            <div className="failure-meter">
              <div className="failure-header">
                <span>Failure meter</span>
                <span className="failure-rate">{roundedRate}%</span>
              </div>
              <div className="meter-track">
                <div
                  className="meter-fill"
                  style={{ width: `${Math.min(roundedRate, 100)}%` }}
                />
              </div>
              <p className="helper">
                {failedTestRounds} failed out of {safeTestRounds} test rounds.
              </p>
              <div className={verdictClass}>
                {verdictLabel} (tolerated: {acceptedFailures})
              </div>
            </div>

            <div className="result-bit">
              <span className="result-label">Result bit</span>
              <div className="result-value">
                {resultBit === null ? "-" : resultBit}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ResultsPanel;
