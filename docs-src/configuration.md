# Configure and run

Edit `configs/default.yaml` or create an override YAML. Paths are relative to the configuration file, not the shell's current directory. Unknown keys are errors.

```yaml
scene: fire/suburban/level_1
survivor_variant: 1
robots: 4
baseline: frontier
mission_seconds: 600
search:
  region: affected_area
  assignment: partitioned
inference:
  vlm_url: null
  vlm_model: null
  gpu: 0
simulation:
  gpu: 0
```

`scene` selects disaster/locality/damage level; `survivor_variant` selects a published survivor layout. `robots` uses the first N verified spawn points from the scene manifest. Missions share a start time and a simulated-time budget after takeoff. Policy startup and mapper initialization currently count within the mission budget; HTTP inference services are warmed beforehand. Fixed navigation limits are configured in MIGHTY; the runtime uses the upstream navigation interface.

## Search areas

`region: affected_area` uses the bundle's disaster boundary; `whole_map` uses the map boundary. `custom` uses `custom_polygon`. These polygons must be convex and given in world XY meters. `assignment: partitioned` splits the polygon into deterministic equal-area strips. `shared` gives every robot the entire polygon. The generated `assignments.svg` previews the allocation.

```bash
./dw run --robots 4 --baseline frontier
./dw run --robots 4 --baseline conavgpt
```

The CoNavGPT command selects `whole_map` and `shared` automatically. It starts one team planner on a bridged DDS domain, rather than a separate cooperative planner per robot. Frontier, Lawnmower and VLFM use per-robot policies. RAVEN uses its RayFronts adapter; consult RayFronts' own docs for mapper usage.

## Inference

YOLO/SAM and BLIP run locally through `asm_offboard` when needed by the selected baseline. Local services share `inference.gpu`.

Leave `inference.vlm_url` as `null`, `none`, or blank to run the bundled VLM locally. To use an existing OpenAI-compatible vision API, set `vlm_url` to its API base address and `vlm_model` to the provider's model name. The API key comes from the environment variable named by `vlm_api_key_env`, default `DW_VLM_API_KEY`. The local VLM service is skipped when a URL is supplied.

See [VLM API configuration](vlm-api.md) for a complete example and the supported request format.

## Artifacts and shutdown

`run` validates configuration and generates all mission files before starting containers. For optional inspection, `./dw config check` validates settings without running a mission, and `./dw prepare --robots 4 --baseline frontier --output .local/preview` writes mission files and an assignment preview. Neither command is required before `run`.

`./dw run --dry-run` resolves the launch without starting containers. A completed run saves configuration, version pins, per-robot reports/trajectories, policy logs and container logs under `results_root`. Policies receive public bounds and observations; survivor ground truth is kept for the host evaluator. `./dw down` stops the current DisasterWorld project. Use distinct `runtime.project` and `network_subnet` values for simultaneous installations.

!!! todo "Maintainer TODO — simulator validation"

    Complete a frozen-scene end-to-end acceptance run. Verify sensor alignment, common timing, report frames and policy settings against the paper before release.
