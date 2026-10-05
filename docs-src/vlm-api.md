# Use a VLM API

YOLO/SAM and BLIP run locally. For CoNavGPT, choose either the bundled local VLM or an existing OpenAI-compatible vision Chat Completions API.

## Local VLM

Leave `inference.vlm_url` as `null`, `none`, or blank. DisasterWorld starts the release-locked `Qwen/Qwen2.5-VL-3B-Instruct` model on `inference.gpu`. No API key is needed.

## Existing VLM API

Create an override such as `configs/my-vlm.yaml` in the DisasterWorld code checkout:

```yaml
inference:
  vlm_url: https://provider.example/v1
  vlm_model: provider/vision-model
  vlm_api_key_env: DW_VLM_API_KEY
```

Replace the example URL and model name with those supplied by your API provider. `vlm_url` is the API base address; the client appends `/chat/completions`. Its path depends on the provider and often ends in `/v1`.

Export your key and run from the code checkout:

```bash
export DW_VLM_API_KEY="YOUR_API_KEY"
./dw run --config configs/my-vlm.yaml --robots 4 --baseline conavgpt
```

Setting `vlm_url` skips the local VLM service. YOLO/SAM remains local. You can name another key environment variable with `vlm_api_key_env`; credentials are passed to the container and are excluded from saved mission configuration. An unauthenticated compatible server can be used without exporting a key.

The model must accept `image_url` content parts, including base64 image data, and JSON-object responses through `response_format: {"type": "json_object"}`. CoNavGPT sends the model name you configure; it is not restricted to the bundled Qwen model. The client accepts provider model aliases and APIs without a `/models` catalog.

The API URL must be reachable from robot containers. For a server on your own machine, use a reachable host address; `localhost` inside a container refers to that container.

The saved configuration records your endpoint and model name. Report the VLM model used when comparing baseline results.
