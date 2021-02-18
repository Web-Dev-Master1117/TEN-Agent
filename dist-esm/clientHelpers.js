import { createPipelineFromOptions, bearerTokenAuthenticationPolicy, DefaultHttpsClient, } from "@azure/core-https";
let cachedHttpsClient;
const DEFAULT_SCOPE = "https://cognitiveservices.azure.com/.default";
export function createDefaultPipeline(credential, options = {}) {
    const pipeline = createPipelineFromOptions(options);
    pipeline.addPolicy(bearerTokenAuthenticationPolicy({
        credential,
        scopes: DEFAULT_SCOPE,
    }));
    return pipeline;
}
export function getCachedDefaultHttpsClient() {
    if (!cachedHttpsClient) {
        cachedHttpsClient = new DefaultHttpsClient();
    }
    return cachedHttpsClient;
}
//# sourceMappingURL=clientHelpers.js.map