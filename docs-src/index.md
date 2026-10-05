# DisasterWorld

DisasterWorld evaluates survivor-search systems in damaged simulated environments. The [DisasterWorld codebase](https://github.com/DisasterWorld/DisasterWorld) provides a local runtime, mission configuration, survivor-only task generation and saved-report evaluation. Isaac Sim loads downloaded scenes; AirStack supplies the provided aerial autonomy stack.

Start with [installation](installation.md), then [configure and run an episode](configuration.md). You can use the provided policies or [add your own ROS baseline](custom-baselines.md).

## Run an episode

After setup and installing the scenes, run this from the DisasterWorld code checkout to start a four-robot Frontier mission:

```bash
./dw run --robots 4 --baseline frontier
```

`run` validates configuration, prepares search areas and robot settings, starts the simulator and policies, and saves episode artifacts for [evaluation](evaluation.md).

## Reference

Use the navigation sidebar for dataset structure, survivor generation, baseline integration and troubleshooting. [Mission configuration](configuration.md) describes fleet sizes, partitioned or shared bounds, and local inference and optional VLM APIs.

!!! todo "Maintainer TODO — before release"

    Publish the dataset bundle and fill in its download URL and checksum. Include local USD assets, scene manifests, survivor annotations and verified spawns in the [bundle format](dataset.md). Complete end-to-end simulation validation and the paper reproduction audit before release.

For detailed RayFronts documentation, see the [original RayFronts repository](https://github.com/RayFronts/RayFronts). For AirStack setup and interfaces, see the [AirStack documentation](https://docs.theairlab.org/develop/docs/).
