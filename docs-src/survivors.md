# Generate additional search tasks

Select the original disaster layout with `--scene`, such as `fire/urban/level_1`. The generator loads that scene's people-free damaged geometry and its own verified placement candidates. It samples survivor positions and poses on that layout while keeping buildings, debris and other damaged geometry fixed.

```bash
./dw survivors generate --scene fire/urban/level_1 \
  --seed 7 --count 20 --output data/disasterworld/generated/fire-urban-l1-task-7
```

Then run the generated task on the same scene:

```bash
./dw run --scene fire/urban/level_1 \
  --generated-task generated/fire-urban-l1-task-7/generated_task.json \
  --robots 4 --baseline frontier
```

`--scene` selects `scenes/fire/urban/level_1/manifest.json` in this example. Its `geometry_file` and `placement_candidates_file` identify the original geometry and the candidates validated for that exact layout. The generator checks the geometry checksum before sampling, and the task records its source scene and geometry checksum. A run rejects a task if its scene or geometry differs.

Generated tasks live inside `dataset.root` so USD references work in the simulator container. `generated_task` is a dataset-relative manifest path. Published variants remain separate; generated tasks are marked synthetic in evaluation metadata. Candidate sampling is deterministic for a given seed and occurs without replacement; a location can have several verified posed assets.

The publisher's `placement_candidates.json` must contain the SHA-256 of `geometry_file` and candidates like:

```json
{
  "geometry_sha256": "SHA256_OF_PEOPLE_FREE_ROOT_LAYER",
  "candidates": [{
    "id": "candidate_01",
    "position": [10,20,0.5],
    "verified_static_collision": true,
    "poses": [{
      "asset_file": "survivor_assets/lying.usda",
      "pose_label": "lying",
      "yaw_degrees": 45,
      "verified_static_collision": true
    }]
  }]
}
```

Posed assets must have a valid default prim and an origin compatible with the candidate translation. Verification applies to the full posed body at that candidate. The generator trusts publisher verification metadata; it does not run a physics clearance check. Candidate locations must also avoid mutually overlapping bodies when sampled together. The current SHA checks the root geometry layer, so the publisher must freeze referenced dependencies as well.

The generator writes a USD scene that references the selected geometry and adds the sampled survivors, along with ground truth and a task manifest.

```{admonition} Maintainer TODO — complete placement generation
:class: maintainer-todo

Export scene-specific candidates and posed assets with the dataset bundle. The current generator resamples prepared candidates; it does not yet run the research placement pipeline on arbitrary geometry. Add that pipeline and validate collision clearance if unrestricted new locations or poses are required for release.
```
