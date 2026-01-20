type ResultsPanelProps = {
  isVisible: boolean;
  isStale: boolean;
  isGlow: boolean;
  failedTestRounds: number;
  testRounds: number;
  acceptedFailures: number;
  resultBit: number | null;
  correctValue: number | null;
  isMatch: boolean | null;
};

function ResultsPanel({
  isVisible,
  isStale,
  isGlow,
  failedTestRounds,
  testRounds,
  acceptedFailures,
  resultBit,
  correctValue,
  isMatch,
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

  const panelClass = isGlow ? "panel results is-glow" : "panel results";

  return (
    <div className={panelClass}>
      <div className="panel-header">
        <div>
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
                <span>
                  Failure meter
                  <span className="failure-count">
                    {failedTestRounds}/{safeTestRounds} Failed test rounds 
                  </span>
                </span>
                <span className="failure-rate">
                  {roundedRate}%{" "}
                  <span className={verdictClass}>
                    {verdictLabel} (tolerated {acceptedFailures})
                  </span>
                </span>
              </div>
              <div className="meter-track">
                <div
                  className="meter-fill"
                  style={{ width: `${Math.min(roundedRate, 100)}%` }}
                />
              </div>
            </div>

            <div className="result-bit">
              <span className="result-label">Result bit</span>
              <div className="result-value">
                {resultBit === null ? "-" : resultBit}
              </div>
            </div>
            <div className="result-bit">
              <span className="result-label">Expected value</span>
              <div className="result-value">
                {correctValue === null ? "-" : correctValue}
              </div>
            </div>
            <div className="result-bit">
              <span className="result-label">Match</span>
              <div className="result-value">
                {isMatch === null ? "-" : isMatch ? "Yes" : "No"}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ResultsPanel;
