import {
  createPipelineFromOptions,
  PipelineOptions,
  bearerTokenAuthenticationPolicy,
  Pipeline,
  DefaultHttpsClient,
  HttpsClient,
} from "@azure/core-https";
import { TokenCredential } from "@azure/core-auth";

let cachedHttpsClient: HttpsClient | undefined;
const DEFAULT_SCOPE = "https://cognitiveservices.azure.com/.default";

export function createDefaultPipeline(
  credential: TokenCredential,
  options: PipelineOptions = {}
): Pipeline {
  const pipeline = createPipelineFromOptions(options);
  pipeline.addPolicy(
    bearerTokenAuthenticationPolicy({
      credential,
      scopes: DEFAULT_SCOPE,
    })
  );

  return pipeline;
}

export function getCachedDefaultHttpsClient(): HttpsClient {
  if (!cachedHttpsClient) {
    cachedHttpsClient = new DefaultHttpsClient();
  }

  return cachedHttpsClient;
}
