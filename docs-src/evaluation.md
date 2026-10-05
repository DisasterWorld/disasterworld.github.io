# Evaluate saved episodes

```bash
./dw evaluate --run results/RUN_DIRECTORY --matching-radius YOUR_RADIUS_METERS
```

The evaluator requires a completed episode from every robot, evaluator ground truth in world coordinates and a positive matching radius chosen for the experiment. Scoring uses the simulated time a report reaches the task server, relative to the common mission start, so processing/communication delay remains part of the search system. The publisher's header stamp is retained separately. Reports outside the budget receive no credit. Each report matches its nearest survivor within the radius; duplicate reports do not add discoveries.

TIP integrates normalized survivor progress over the mission: for N survivors, budget T, and first report times `t_i`, `TIP = sum(1 - t_i/T) / N`. Progress is the fraction discovered by the deadline. Saved trajectories provide the team path length.

PPL requires a validated collision-free minimum reference route for the exact discovered survivor subset, robot count and starts. The evaluator leaves PPL unavailable when that route is absent, rather than substituting straight-line distances through debris. Reference generation/validation is a dataset release gate. A no-discovery run has PPL zero.

Optional `reference_routes` entries in ground truth use `survivor_ids`, `distance_m`, `validated_collision_free: true`, `robot_count`, and `start_positions`. Starts must match the recorded mission-start positions after takeoff, rather than ground spawn locations. The publisher is responsible for the route's minimum-path validity. Failed/incomplete episodes are refused. Output is written to `metrics.json`; synthetic generated tasks are identified in run metadata.

This is an initial report-based evaluator. Paper-equivalent experiments still require auditing the matching rule/radius, reference routes, survivor definition, camera geometry, policy parameters and timing against the manuscript. Default CLI values are not a reproduction guarantee.
