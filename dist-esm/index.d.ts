import { PipelineOptions } from "@azure/core-https";
import { TokenCredential } from "@azure/core-auth";
import { AnalyzeParameters, AnalyzeStatusParameters, HealthStatusParameters, HealthParameters, EntitiesRecognitionGeneralParameters, EntitiesRecognitionPiiParameters, EntitiesLinkingParameters, KeyPhrasesParameters, LanguagesParameters, SentimentParameters, CancelHealthJobParameters, RequestParameters } from "./parameters";
import { Analyze202Response, Analyze400Response, Analyze500Response, AnalyzeStatus200Response, AnalyzeStatus404Response, AnalyzeStatus500Response, HealthStatus200Response, HealthStatus404Response, HealthStatus500Response, CancelHealthJob202Response, CancelHealthJob404Response, CancelHealthJob500Response, Health202Response, Health400Response, Health500Response, EntitiesRecognitionGeneral200Response, EntitiesRecognitionGeneral400Response, EntitiesRecognitionGeneral500Response, EntitiesRecognitionPii200Response, EntitiesRecognitionPii400Response, EntitiesRecognitionPii500Response, EntitiesLinking200Response, EntitiesLinking400Response, EntitiesLinking500Response, KeyPhrases200Response, KeyPhrases400Response, KeyPhrases500Response, Languages200Response, Languages400Response, Languages500Response, Sentiment200Response, Sentiment400Response, Sentiment500Response, PipelineResponse } from "./responses";
/**
 * Definition of each operation to help building their types
 */
interface Routes {
    "POST /analyze": {
        options: AnalyzeParameters;
        response: Promise<Analyze202Response | Analyze400Response | Analyze500Response>;
        pathParameters: [];
    };
    "GET /analyze/jobs/{jobId}": {
        options: AnalyzeStatusParameters;
        response: Promise<AnalyzeStatus200Response | AnalyzeStatus404Response | AnalyzeStatus500Response>;
        pathParameters: [jobId: string];
    };
    "GET /entities/health/jobs/{jobId}": {
        options: HealthStatusParameters;
        response: Promise<HealthStatus200Response | HealthStatus404Response | HealthStatus500Response>;
        pathParameters: [jobId: string];
    };
    "DELETE /entities/health/jobs/{jobId}": {
        options: CancelHealthJobParameters;
        response: Promise<CancelHealthJob202Response | CancelHealthJob404Response | CancelHealthJob500Response>;
        pathParameters: [jobId: string];
    };
    "POST /entities/health/jobs": {
        options: HealthParameters;
        response: Promise<Health202Response | Health400Response | Health500Response>;
        pathParameters: [];
    };
    "POST /entities/recognition/general": {
        options: EntitiesRecognitionGeneralParameters;
        response: Promise<EntitiesRecognitionGeneral200Response | EntitiesRecognitionGeneral400Response | EntitiesRecognitionGeneral500Response>;
        pathParameters: [];
    };
    "POST /entities/recognition/pii": {
        options: EntitiesRecognitionPiiParameters;
        response: Promise<EntitiesRecognitionPii200Response | EntitiesRecognitionPii400Response | EntitiesRecognitionPii500Response>;
        pathParameters: [];
    };
    "POST /entities/linking": {
        options: EntitiesLinkingParameters;
        response: Promise<EntitiesLinking200Response | EntitiesLinking400Response | EntitiesLinking500Response>;
        pathParameters: [];
    };
    "POST /keyPhrases": {
        options: KeyPhrasesParameters;
        response: Promise<KeyPhrases200Response | KeyPhrases400Response | KeyPhrases500Response>;
        pathParameters: [];
    };
    "POST /languages": {
        options: LanguagesParameters;
        response: Promise<Languages200Response | Languages400Response | Languages500Response>;
        pathParameters: [];
    };
    "POST /sentiment": {
        options: SentimentParameters;
        response: Promise<Sentiment200Response | Sentiment400Response | Sentiment500Response>;
        pathParameters: [];
    };
}
declare type RouteParams<TRoute extends string> = TRoute extends `${infer _Head}{${infer _Param}}${infer Tail}` ? [pathParam: string, ...pathParam: RouteParams<Tail>] : TRoute extends `${infer _Head}{${infer _Param}}` ? [string] : [];
declare type AnyRequired<T> = {} extends T ? false : true;
/**
 * Calculates the type of the options bag, also decides if it needs to be marked as required or optional.
 */
declare type RequestOptions<T extends keyof Routes> = AnyRequired<Routes[T]["options"]> extends false ? [options?: Routes[T]["options"]] : [options: Routes[T]["options"]];
/**
 * Request operation's arguments.
 * These arguments can be positional parameters to fill in the path template,
 * and also figures out if the options parameter should be marked as required or not
 * depending of whether or not there is a required property in the options
 */
declare type RequestArgs<T extends keyof Routes> = Routes[T]["pathParameters"] extends [
] ? RequestOptions<T> : AnyRequired<Routes[T]["options"]> extends false ? [
    ...pathParameters: Routes[T]["pathParameters"],
    options?: Routes[T]["options"]
] : [
    ...pathParameters: Routes[T]["pathParameters"],
    options: Routes[T]["options"]
];
/**
 * Type of the requestUnchecked function parameters. Figures out if it needs to add positional parameters for
 * filling out pathParameters by parsing the route string.
 */
declare type RequestUncheckedArgs<T extends string> = [
    ...pathParameters: RouteParams<T>,
    options?: RequestParameters
];
/**
 * Definition of the request function, it can include positional parameters
 * to fill out the url template.
 * It also adds the options bag to provide a body, queryParameters or headers
 */
declare type Request = {
    <T extends keyof Routes>(route: T, ...args: RequestArgs<T>): Routes[T]["response"];
};
/**
 * Definition of the requestUnchecked function, it can include positional parameters
 * to fill out the url template, by parsing the route provided.
 * It als adds an optional options bag to provide a body, queryParameters or headers
 */
declare type RequestUnchecked = {
    <T extends string>(route: T, ...args: RequestUncheckedArgs<T>): Promise<PipelineResponse>;
};
/**
 * Interface that defines the TextAnalytics client
 */
export interface TextAnalyticsClient {
    request: Request;
    requestUnchecked: RequestUnchecked;
}
declare function createTextAnalyticsClient(credentials: TokenCredential, Endpoint: string, options?: PipelineOptions): TextAnalyticsClient;
export default createTextAnalyticsClient;
export * from "./models";
export * from "./parameters";
export * from "./responses";
//# sourceMappingURL=index.d.ts.map