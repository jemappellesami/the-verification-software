import json
import sys
import random


def main(payload):
    try:
        test_rounds = int(payload.get("testRounds", 1))
    except (TypeError, ValueError):
        test_rounds = 1
    safe_test_rounds = max(test_rounds, 1)
    failed_test_rounds = random.randrange(safe_test_rounds)
    result_bit = 1 if random.random() < 0.5 else 0
    return {
        "failedTestRounds": failed_test_rounds,
        "resultBit": result_bit,
    }


if __name__ == "__main__":
    raw = sys.stdin.read()
    payload = json.loads(raw) if raw else {}
    result = main(payload)
    sys.stdout.write(json.dumps(result))
