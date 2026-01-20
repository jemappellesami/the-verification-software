# Verification Software

This project showcases protocols for verification of delegated quantum computations. The UI lets you configure client and server settings, then delegates the simulation to a backend that calls the Veriphix Python library.

## Repository layout
- `verification-software-front/` Frontend (Vite + React).
- `backend/` Node.js API that launches a Python simulation.
- `backend/veriphix/` Veriphix submodule and its Python source.

## Prerequisites
- Node.js 18+ and npm
- Python 3.x
- Git (with submodules)

## Setup
### 1) Initialize the Veriphix submodule
```bash
cd /Users/sabdulsa/Codes/the-verification-software
git submodule update --init --recursive
```

### 2) Create the Python environment for Veriphix
The backend is configured to run the simulation using the virtual environment at `backend/veriphix/.venv`.

```bash
cd /Users/sabdulsa/Codes/the-verification-software/backend/veriphix
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 3) Initialize Veriphix circuits
Run this from the `backend/veriphix` folder to generate the `circuits/` data used by the simulator.
```bash
cd /Users/sabdulsa/Codes/the-verification-software/backend/veriphix
python -m veriphix.sampling_circuits.sampling_circuits --ncircuits 1000 --nqubits 4 --depth 5 --p-gate 0.5 --p-cnot 0.25 --p-cnot-flip 0.5 --p-rx 0.5 --seed 1729 --target circuits
```

### 4) Install frontend dependencies
```bash
cd /Users/sabdulsa/Codes/the-verification-software/verification-software-front
npm install
```

### 5) Install backend dependencies
The backend uses only Node built-ins.
```bash
cd /Users/sabdulsa/Codes/the-verification-software/backend
npm install
```

## Running
### Start the backend
```bash
cd /Users/sabdulsa/Codes/the-verification-software/backend
npm run dev
```

### Start the frontend
```bash
cd /Users/sabdulsa/Codes/the-verification-software/verification-software-front
npm run dev
```

Open the frontend URL printed by Vite (typically `http://localhost:5173`).

## Notes
- The backend calls `backend/veriphix_instance.py`, which imports Veriphix and runs a random BQP circuit from `backend/veriphix/circuits`.
- The backend expects the Veriphix virtual environment at `backend/veriphix/.venv/bin/python`. If you change the environment location, update `backend/server.js` accordingly.
- Noise models are selected based on the UI settings and applied via Veriphix using `DensityMatrixBackend` when noise is enabled.
