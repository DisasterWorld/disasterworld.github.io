# Installation

The provided containers support Linux x86_64, NVIDIA GPUs and ROS 2 Jazzy. Install Git, Python 3.10+ with `venv`, Docker Engine, Docker Compose 2.30+ and the [NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html). Verify `nvidia-smi` and Docker GPU access before setup. Isaac Sim's [requirements](https://docs.isaacsim.omniverse.nvidia.com/latest/installation/requirements.html) determine the simulator's supported hardware and driver.

```bash
git clone https://github.com/DisasterWorld/DisasterWorld.git disasterworld && cd disasterworld && ./dw setup
```

Setup creates a small Python virtual environment, obtains pinned AirStack/MIGHTY/module checkouts in `.runtime`, registers modules using the AirStack CLI, builds isolated container images and builds the ROS overlay. Optional CMU credentials are prompted interactively, with Skip as the default. `./dw setup --public-only` skips those prompts. Credentials and caches stay in ignored local directories. Setup never resets tracked changes in an existing checkout.

```{admonition} Maintainer TODO — public repository access
:class: maintainer-todo

Make the release repositories public when ready. During private preparation, setup requires GitHub access to the repositories even when AirLab credentials are skipped.
```

The first build and model downloads need internet and substantial disk space; exact resource requirements depend on the selected policies and scenes. Inference and simulation may share GPU 0. Two GPUs are not a requirement, but a single GPU must fit the simulator and selected models. Smaller fleets and Frontier/Lawnmower are useful starting points.

```{admonition} Maintainer TODO — dataset download
:class: maintainer-todo

Set the archive URL and SHA-256 in the default configuration when the bundle is published.
```

Download the scenes with:

```bash
./dw dataset download
```

Alternatively unpack the released self-contained bundle into `dataset.root`. Existing nonempty dataset directories are not replaced. Setup supports `--skip-build` followed by `./dw build` for inspecting registration before an expensive build.

Then run a mission; configuration validation and task preparation happen automatically:

```bash
./dw run --robots 4 --baseline frontier
```

To work on the three repositories together, use `./dw setup --module-dir .. --public-only`. This uses sibling module folders instead of downloading release revisions. The release lock records the supported AirStack and Pegasus pins; other AirStack versions are not assumed compatible.
