# DisasterWorld integration

The release lock pins a tested integration target, rather than assuming every AirStack version is interchangeable. Setup clones upstream AirStack, registers local module paths in `modules.repos`, and invokes its module CLI. Generated overlays mount ROS packages and simulator launch scripts without modifying upstream task messages.

| Component | DisasterWorld responsibility |
| --- | --- |
| `asm_disasterworld_sim` | Load a downloaded frozen USD scene and configured aircraft spawns |
| `asm_disasterworld_ros` | Search policies, the `SurvivorSearch` action, reports, mission coordination |
| `asm_mighty` | Pinned upstream motion planner; fixed speed configured in YAML |
| `asm_offboard` | Local detector, BLIP and optional local VLM services |
| `asm_rayfronts` | RayFronts container and camera-pose connection used by RAVEN |

The CoNavGPT and RAVEN baselines adapt their original implementations for AirStack: [Co-NavGPT2](https://github.com/ybgdgh/Co-NavGPT2) and [RAVEN](https://github.com/castacks/RAVEN). Source attribution and adaptation details are recorded in the ROS packages and the repository's [NOTICE](https://github.com/DisasterWorld/DisasterWorld/blob/main/NOTICE.md).

The simulator uses upstream Pegasus. Research camera render gates, tick skipping and time slicing are excluded. `SurvivorSearch` is a benchmark-owned action; `NavigateTask` and `SemanticSearchTask` are not extended. Policies publish nonempty `/robot_N/global_plan` paths to the upstream MIGHTY follower after takeoff.

The runtime gives each aircraft a ROS domain and bridges named observation/plan topics for cooperative policies. All containers use the benchmark's isolated Compose project/network. Private survivor annotations are available only to simulation/evaluation.

For detailed RayFronts documentation, see the [original RayFronts repository](https://github.com/RayFronts/RayFronts). AirStack module conventions are documented in the [AirStack documentation](https://docs.theairlab.org/develop/docs/). These integrations can move into upstream AirStack independently of DisasterWorld. Compatibility with later revisions requires explicit adapter testing and updating the lock.
