"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCachedDefaultHttpsClient = exports.createDefaultPipeline = void 0;
const core_https_1 = require("@azure/core-https");
let cachedHttpsClient;
const DEFAULT_SCOPE = "https://cognitiveservices.azure.com/.default";
function createDefaultPipeline(credential, options = {}) {
    const pipeline = core_https_1.createPipelineFromOptions(options);
    pipeline.addPolicy(core_https_1.bearerTokenAuthenticationPolicy({
        credential,
        scopes: DEFAULT_SCOPE,
    }));
    return pipeline;
}
exports.createDefaultPipeline = createDefaultPipeline;
function getCachedDefaultHttpsClient() {
    if (!cachedHttpsClient) {
        cachedHttpsClient = new core_https_1.DefaultHttpsClient();
    }
    return cachedHttpsClient;
}
exports.getCachedDefaultHttpsClient = getCachedDefaultHttpsClient;
