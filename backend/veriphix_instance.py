import json
import random
import sys
from pathlib import Path

VERIPHIX_REPO = Path(__file__).resolve().parent / "veriphix"
sys.path.insert(0, str(VERIPHIX_REPO))

from veriphix.client import Client, Secrets, TrappifiedSchemeParameters
from veriphix.sampling_circuits.qasm_parser import read_qasm
import veriphix.sampling_circuits.brickwork_state_transpiler
from graphix.sim.statevec import StatevectorBackend


def load_pattern_from_circuit(circuit_label: str):
    with (VERIPHIX_REPO / "circuits" / circuit_label).open() as f:
        circuit = read_qasm(f)
        pattern = veriphix.sampling_circuits.brickwork_state_transpiler.transpile(circuit)
        pattern.minimize_space()
    return pattern


def pick_random_bqp_circuit():
    table_path = VERIPHIX_REPO / "circuits" / "table.json"
    with table_path.open() as f:
        table = json.load(f)
    bqp_error = 0.3
    circuits = [name for name, prob in table.items() if prob < bqp_error or prob > 1 - bqp_error]
    return random.choice(circuits)


def main(payload):
    comp_rounds = int(payload.get("computationRounds", 1) or 1)
    test_rounds = int(payload.get("testRounds", 1) or 1)
    threshold = int(payload.get("acceptedFailures", 0) or 0)

    circuit_label = pick_random_bqp_circuit()
    pattern = load_pattern_from_circuit(circuit_label)

    parameters = TrappifiedSchemeParameters(
        comp_rounds=comp_rounds,
        test_rounds=test_rounds,
        threshold=threshold,
    )
    secrets = Secrets(r=True, a=True, theta=True)
    client = Client(pattern=pattern, secrets=secrets, parameters=parameters)

    canvas = client.sample_canvas()
    outcomes = client.delegate_canvas(canvas=canvas, backend_cls=StatevectorBackend)
    traps_decision, computation_decision, result_analysis = client.analyze_outcomes(canvas, outcomes)
    sys.stderr.write(
        "Delegate canvas complete. "
        f"failedTestRounds={result_analysis.nr_failed_test_rounds}, "
        f"trapsDecision={traps_decision}, "
        f"computationDecision={computation_decision}\n"
    )

    failed_test_rounds = int(result_analysis.nr_failed_test_rounds)
    result_bit = int(computation_decision) if traps_decision else 0
    return {
        "failedTestRounds": failed_test_rounds,
        "resultBit": result_bit,
    }


if __name__ == "__main__":
    raw = sys.stdin.read()
    payload = json.loads(raw) if raw else {}
    result = main(payload)
    sys.stdout.write(json.dumps(result))
