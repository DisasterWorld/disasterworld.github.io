# Add a baseline

The [baseline template](https://github.com/DisasterWorld/DisasterWorld/tree/main/templates/baseline) is a small ROS 2 AirStack module. Copy it, rename the module/package, and register it using `airstack.sh module add PATH --no-hooks`. The template's node consumes odometry and public task bounds; it publishes a nonempty path to MIGHTY. It has no survivor labels or ground-truth access.

Implement observation-driven goal selection in `example.py`, subscribe to the required camera/depth/LiDAR topics and publish `disasterworld_msgs/DetectionReport` only when your perception system produces a survivor location. Reports must identify their coordinate frame (`map` or `world`), observation timestamp and stable report ID. Local `map` coordinates are translated using that robot's spawn; a team policy can publish world coordinates directly.

For timed benchmark execution, register your policy in `config.BASELINES`, add a launch command in `dw_runtime/task_server.py`, and declare which local inference services it needs in `inference_plan`. This explicit adapter step is required in the initial release; there is not yet a dynamic policy registry. Keep the existing common start/deadline and evaluator report recording.

A separate stack can drive a different robot through its own controller, using the downloaded USD scenes and the same public bounds/report format. The provided one-line setup supports the aerial AirStack/MIGHTY path; arbitrary robots require their own simulation/controller adapter.

Declare dependencies in the module manifest or its container layer. See the [AirStack module documentation](https://docs.theairlab.org/develop/docs/development/modules/) for module packaging. The template publishes no synthetic detections; replace its example waypoint policy before evaluating it as a search baseline.
