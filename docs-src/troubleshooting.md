# Troubleshooting

- **Dataset URL is a placeholder:** supply the published URL/checksum, or unpack a local bundle. `dw run` requires the selected scene files to be installed.
- **Out of GPU memory:** start with one robot and Frontier/Lawnmower, check other GPU processes, or assign model services to another available GPU. For CoNavGPT, an existing [VLM API](vlm-api.md) can replace the local VLM.
- **Existing checkout has changes:** setup preserves tracked edits. Use the managed `.runtime` installation or a separate clean supported checkout; do not point setup at the research fork.
- **Endpoint connection fails:** the URL is resolved from containers. Check the VLM API base URL, configured model name, API key, and reachable host/IP.
- **No odometry, takeoff rejected, or clock stalled:** inspect `container.log` and policy logs in the run directory. Failed missions are not scored as completed episodes.
- **Missing USD textures/references:** the public bundle must be self-contained. Native USD dependency validation is required before release.
- **PPL unavailable:** no validated reference route matches this discovery subset, fleet size and starts. TIP and Progress can still be computed for a completed episode.
- **Already running project:** use `./dw down`, or a different project name and nonconflicting subnet. Existing research containers are separate from this runtime.

Reach out or raise an issue if you encounter any problems.
