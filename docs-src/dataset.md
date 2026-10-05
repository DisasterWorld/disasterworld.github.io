# Dataset bundles

The runtime loads local frozen USD scenes and requires no lab Nucleus access. Archives must contain `scenes/` at their root and regular files/directories only; external archive links and path traversal are rejected.

!!! todo "Maintainer TODO — publish the bundle"

    Fill in the public archive URL and SHA-256 in the default configuration after validating and publishing the bundle.

Each scene has a manifest at `scenes/DISASTER/LOCALITY/level_N/manifest.json`:

```json
{
  "schema_version": 1,
  "units": "meters",
  "world_frame": "world",
  "whole_map": [[-100,-100],[100,-100],[100,100],[-100,100]],
  "affected_area": [[-80,-60],[80,-60],[80,60],[-80,60]],
  "spawn_points": [[0,0,1],[3,0,1],[6,0,1],[9,0,1]],
  "variants": {
    "1": {"stage_file": "variants/1/scene.usda", "ground_truth_file": "variants/1/ground_truth.json"}
  },
  "geometry_file": "geometry/scene.usda",
  "placement_candidates_file": "placement_candidates.json"
}
```

The example describes the format, not a published benchmark task. Provide entries for all available published variants. Spawn points must be verified free-space positions for the chosen aircraft; the runtime checks numeric validity, map containment and separation, but does not certify collision safety.

USD layers must use meters, Z-up, a `/World` root and portable local references. Include every referenced asset, texture and dependency. Do not ship `omniverse://` references into the lab server. The publisher validates USD dependencies and physical properties in Isaac Sim before release. Downloads verify the archive checksum, and each run checks its selected scene manifest and required paths automatically.

Ground truth contains `world_frame: "world"` and a `survivors` array of objects with unique `id` and `[x,y,z]` `position`. Ground truth is supplied to the evaluator, never mounted into policy containers. See [evaluation](evaluation.md) for optional reference route metadata.

`geometry_file` must be people-free damaged geometry. It and `placement_candidates_file` are required only for [survivor-only generation](survivors.md).

!!! todo "Maintainer TODO — placement assets"

    Prepare the people-free geometry, posed survivor assets and verified placement candidates from the research dataset before publishing the bundle.
