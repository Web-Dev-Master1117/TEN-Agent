import { PipelineOptions, Pipeline, HttpsClient } from "@azure/core-https";
import { TokenCredential } from "@azure/core-auth";
export declare function createDefaultPipeline(credential: TokenCredential, options?: PipelineOptions): Pipeline;
export declare function getCachedDefaultHttpsClient(): HttpsClient;
