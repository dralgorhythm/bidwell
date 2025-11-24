# Chaos Engineering Instructions
> **Apply To**: `chaos-mesh.yaml`, `gremlin.json`, `litmus/*.yaml`

Guidelines for proactively testing system resilience by injecting faults to identify weaknesses before they cause outages.

## <coding_standards>
1.  **Safety Checks**: All chaos experiments MUST have an automated "Stop Button" or rollback mechanism.
2.  **Scope**: Never target the entire production fleet at once. Use canary deployments or specific availability zones.
</coding_standards>

## <best_practices>
*   **Blast Radius**: Minimize the impact of the experiment. Start small (one instance) and expand.
*   **Rollback**: Ensure you can stop the experiment immediately if things go wrong.
*   **Observability**: You must have logs/metrics to see the effect of the experiment.
*   **Environment**: Run experiments in a safe environment (Staging) before attempting in Production.
</best_practices>

## <testing_protocols>
*   **Game Days**: Dedicated days for teams to run chaos experiments and practice incident response.
*   **Steady State Verification**: Automatically verify that key business metrics (e.g., order rate) remain healthy during the experiment.
</testing_protocols>

## <tooling>
*   **Orchestration**: Chaos Mesh, LitmusChaos.
*   **SaaS**: Gremlin.
*   **Manual**: Network link conditioning, process killing.
</tooling>

## <concepts>
1.  **Hypothesis**: Define steady state (e.g., "System returns 200 OK").
2.  **Variable**: Introduce a real-world event (e.g., "DB latency increases by 500ms").
3.  **Experiment**: Run the test in a controlled environment.
4.  **Verify**: Check if steady state is maintained.
</concepts>

