Here is the rationale of the project.


I aim to showcase protocols for Verification of Delegated Quantum Computations. There are thus two entities: the Client and the Server. They communicate through a quantum communication channel.

First, a model of computation has to be chosen: is it Measurement-Based Quantum Computing or Clifford + Magic-State Injection model ? Choose!



Then, a Dashboard appears in which Client and Server are in isolated boxes.


The Client can make choices like 
- "Choose a computation": here, drag and drop a file in `.qasm` format
- "Choose a Verification Strategy": here, drop-down menu with choices like `Single-Qubit traps`, `Dummyless traps`, and `Random traps`
- "Choose parameters of Protocol", and here you have a panel with parameters tunable by sliders
  - Number of computation rounds
  - Number of test rounds
  - Number of accepted test rounds failure (has to be lower than the number of test rounds)


The Server can make choices like
- Honest vs. Malicious
  - If Honest:
    - Perfect or Noisy ?
      - Noisy: which noise-model ? Here, drop-down menu with existing noise-models, including 'Depolarizing', 'Gentle Global', or input a custom noise-model, and here ask for a file from the user.
  - If Malicious: drop-down menu with existing Malicious models such as 'Global Malicious', or input a custom noise-model, and here ask for a file from the user.


