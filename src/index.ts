import {
  RawHttpHeaders,
  PipelineOptions,
  Pipeline,
  createPipelineRequest,
  PipelineResponse,
  createHttpHeaders,
} from "@azure/core-https";
import { TokenCredential } from "@azure/core-auth";
import {
  AnalyzeParameters,
  AnalyzeStatusParameters,
  HealthStatusParameters,
  CancelHealthJobParameters,
  HealthParameters,
  EntitiesRecognitionGeneralParameters,
  EntitiesRecognitionPiiParameters,
  EntitiesLinkingParameters,
  KeyPhrasesParameters,
  LanguagesParameters,
  SentimentParameters,
} from "./parameters";
import {
  Analyze202Response,
  Analyze400Response,
  Analyze500Response,
  AnalyzeStatus200Response,
  AnalyzeStatus404Response,
  AnalyzeStatus500Response,
  HealthStatus200Response,
  HealthStatus404Response,
  HealthStatus500Response,
  CancelHealthJob202Response,
  CancelHealthJob404Response,
  CancelHealthJob500Response,
  Health202Response,
  Health400Response,
  Health500Response,
  EntitiesRecognitionGeneral200Response,
  EntitiesRecognitionGeneral400Response,
  EntitiesRecognitionGeneral500Response,
  EntitiesRecognitionPii200Response,
  EntitiesRecognitionPii400Response,
  EntitiesRecognitionPii500Response,
  EntitiesLinking200Response,
  EntitiesLinking400Response,
  EntitiesLinking500Response,
  KeyPhrases200Response,
  KeyPhrases400Response,
  KeyPhrases500Response,
  Languages200Response,
  Languages400Response,
  Languages500Response,
  Sentiment200Response,
  Sentiment400Response,
  Sentiment500Response,
} from "./responses";
import {
  createDefaultPipeline,
  getCachedDefaultHttpsClient,
} from "./clientHelpers";
type Request = <T extends keyof Routes>(
  path: T,
  ...args: Routes[T][0] extends undefined
    ? [options?: RequestParameters]
    : [options: Routes[T][0] & RequestParameters]
) => Routes[T][1];

interface Routes {
  "POST /analyze": [
    AnalyzeParameters,
    Promise<Analyze202Response | Analyze400Response | Analyze500Response>
  ];
  "GET /analyze/jobs/{jobId}": [
    AnalyzeStatusParameters,
    Promise<
      | AnalyzeStatus200Response
      | AnalyzeStatus404Response
      | AnalyzeStatus500Response
    >
  ];
  "GET /entities/health/jobs/{jobId}": [
    HealthStatusParameters,
    Promise<
      | HealthStatus200Response
      | HealthStatus404Response
      | HealthStatus500Response
    >
  ];
  "DELETE /entities/health/jobs/{jobId}": [
    CancelHealthJobParameters,
    Promise<
      | CancelHealthJob202Response
      | CancelHealthJob404Response
      | CancelHealthJob500Response
    >
  ];
  "POST /entities/health/jobs": [
    HealthParameters,
    Promise<Health202Response | Health400Response | Health500Response>
  ];
  "POST /entities/recognition/general": [
    EntitiesRecognitionGeneralParameters,
    Promise<
      | EntitiesRecognitionGeneral200Response
      | EntitiesRecognitionGeneral400Response
      | EntitiesRecognitionGeneral500Response
    >
  ];
  "POST /entities/recognition/pii": [
    EntitiesRecognitionPiiParameters,
    Promise<
      | EntitiesRecognitionPii200Response
      | EntitiesRecognitionPii400Response
      | EntitiesRecognitionPii500Response
    >
  ];
  "POST /entities/linking": [
    EntitiesLinkingParameters,
    Promise<
      | EntitiesLinking200Response
      | EntitiesLinking400Response
      | EntitiesLinking500Response
    >
  ];
  "POST /keyPhrases": [
    KeyPhrasesParameters,
    Promise<
      KeyPhrases200Response | KeyPhrases400Response | KeyPhrases500Response
    >
  ];
  "POST /languages": [
    LanguagesParameters,
    Promise<Languages200Response | Languages400Response | Languages500Response>
  ];
  "POST /sentiment": [
    SentimentParameters,
    Promise<Sentiment200Response | Sentiment400Response | Sentiment500Response>
  ];
}

export interface TextAnalyticsClient {
  request: Request;
}

export interface RequestParameters {
  baseUrl?: string;
  headers?: RawHttpHeaders;
  [parameter: string]: any;
}

function createTextAnalyticsClient(
  credentials: TokenCredential,
  Endpoint: string,
  options?: PipelineOptions
): TextAnalyticsClient {
  const baseUrl = "{Endpoint}/text/analytics/v3.1-preview.3".replace(
    /{Endpoint}/g,
    Endpoint
  );
  const pipeline = createDefaultPipeline(credentials, options);
  pipeline.removePolicy({ name: "exponentialRetryPolicy" });
  return {
    request: (route: string, options: any) => {
      if (route === "POST /analyze") {
        return requestAnalyze(pipeline, baseUrl)(options);
      }
      if (route === "GET /analyze/jobs/{jobId}") {
        return requestAnalyzeStatus(pipeline, baseUrl)(options);
      }
      if (route === "GET /entities/health/jobs/{jobId}") {
        return requestHealthStatus(pipeline, baseUrl)(options);
      }
      if (route === "DELETE /entities/health/jobs/{jobId}") {
        return requestCancelHealthJob(pipeline, baseUrl)(options);
      }
      if (route === "POST /entities/health/jobs") {
        return requestHealth(pipeline, baseUrl)(options);
      }
      if (route === "POST /entities/recognition/general") {
        return requestEntitiesRecognitionGeneral(pipeline, baseUrl)(options);
      }
      if (route === "POST /entities/recognition/pii") {
        return requestEntitiesRecognitionPii(pipeline, baseUrl)(options);
      }
      if (route === "POST /entities/linking") {
        return requestEntitiesLinking(pipeline, baseUrl)(options);
      }
      if (route === "POST /keyPhrases") {
        return requestKeyPhrases(pipeline, baseUrl)(options);
      }
      if (route === "POST /languages") {
        return requestLanguages(pipeline, baseUrl)(options);
      }
      if (route === "POST /sentiment") {
        return requestSentiment(pipeline, baseUrl)(options);
      }
    },
  } as TextAnalyticsClient;
}

function requestAnalyze(pipeline: Pipeline, baseUrl: string) {
  return async function (
    options?: AnalyzeParameters & RequestParameters
  ): Promise<Analyze202Response | Analyze400Response | Analyze500Response> {
    const httpClient = getCachedDefaultHttpsClient();
    const url = new URL(`${baseUrl}${"/analyze"}`);
    const body = { analysisInput: options && options["analysisInput"] };
    const headers = createHttpHeaders({
      accept: "application/json",
      "content-type": "application/json",
    });
    const request = createPipelineRequest({
      url: url.toString(),
      method: "POST",
      body: JSON.stringify(body),
      headers,
    });
    const result = await pipeline.sendRequest(httpClient, request);
    return {
      request,
      headers: result.headers,
      status: result.status as any,
      parsedBody: JSON.parse(result.bodyAsText || "{}"),
    };
  };
}

function requestAnalyzeStatus(pipeline: Pipeline, baseUrl: string) {
  return async function (
    options: AnalyzeStatusParameters & RequestParameters
  ): Promise<
    | AnalyzeStatus200Response
    | AnalyzeStatus404Response
    | AnalyzeStatus500Response
  > {
    let replacedPath: string = "/analyze/jobs/{jobId}";
    replacedPath = replacedPath.replace(/{jobId}/g, options["jobId"]);
    const httpClient = getCachedDefaultHttpsClient();
    const url = new URL(`${baseUrl}${replacedPath}`);
    options["showStats"] &&
      url.searchParams.append("showStats", options["showStats"].toString());
    options["$top"] &&
      url.searchParams.append("$top", options["$top"].toString());
    options["$skip"] &&
      url.searchParams.append("$skip", options["$skip"].toString());

    const headers = createHttpHeaders({
      accept: "application/json",
      "content-type": "application/json",
    });
    const request = createPipelineRequest({
      url: url.toString(),
      method: "GET",
    });
    const result = await pipeline.sendRequest(httpClient, request);
    return {
      request,
      headers: result.headers,
      status: result.status as any,
      parsedBody: JSON.parse(result.bodyAsText || "{}"),
    };
  };
}

function requestHealthStatus(pipeline: Pipeline, baseUrl: string) {
  return async function (
    options: HealthStatusParameters & RequestParameters
  ): Promise<
    HealthStatus200Response | HealthStatus404Response | HealthStatus500Response
  > {
    let replacedPath: string = "/entities/health/jobs/{jobId}";
    replacedPath = replacedPath.replace(/{jobId}/g, options["jobId"]);
    const httpClient = getCachedDefaultHttpsClient();
    const url = new URL(`${baseUrl}${replacedPath}`);
    options["$top"] &&
      url.searchParams.append("$top", options["$top"].toString());
    options["$skip"] &&
      url.searchParams.append("$skip", options["$skip"].toString());
    options["showStats"] &&
      url.searchParams.append("showStats", options["showStats"].toString());

    const headers = createHttpHeaders({
      accept: "application/json",
      "content-type": "application/json",
    });
    const request = createPipelineRequest({
      url: url.toString(),
      method: "GET",
    });
    const result = await pipeline.sendRequest(httpClient, request);
    return {
      request,
      headers: result.headers,
      status: result.status as any,
      parsedBody: JSON.parse(result.bodyAsText || "{}"),
    };
  };
}

function requestCancelHealthJob(pipeline: Pipeline, baseUrl: string) {
  return async function (
    options: CancelHealthJobParameters & RequestParameters
  ): Promise<
    | CancelHealthJob202Response
    | CancelHealthJob404Response
    | CancelHealthJob500Response
  > {
    let replacedPath: string = "/entities/health/jobs/{jobId}";
    replacedPath = replacedPath.replace(/{jobId}/g, options["jobId"]);
    const httpClient = getCachedDefaultHttpsClient();
    const url = new URL(`${baseUrl}${replacedPath}`);

    const headers = createHttpHeaders({
      accept: "application/json",
      "content-type": "application/json",
    });
    const request = createPipelineRequest({
      url: url.toString(),
      method: "DELETE",
    });
    const result = await pipeline.sendRequest(httpClient, request);
    return {
      request,
      headers: result.headers,
      status: result.status as any,
      parsedBody: JSON.parse(result.bodyAsText || "{}"),
    };
  };
}

function requestHealth(pipeline: Pipeline, baseUrl: string) {
  return async function (
    options: HealthParameters & RequestParameters
  ): Promise<Health202Response | Health400Response | Health500Response> {
    const httpClient = getCachedDefaultHttpsClient();
    const url = new URL(`${baseUrl}${"/entities/health/jobs"}`);
    options["model-version"] &&
      url.searchParams.append(
        "model-version",
        options["model-version"].toString()
      );
    options["stringIndexType"] &&
      url.searchParams.append(
        "stringIndexType",
        options["stringIndexType"].toString()
      );
    const body = { documents: options && options["documents"] };

    const headers = createHttpHeaders({
      accept: "application/json",
      "content-type": "application/json",
    });
    const request = createPipelineRequest({
      url: url.toString(),
      method: "POST",
      body: JSON.stringify(body),
      headers,
    });
    const result = await pipeline.sendRequest(httpClient, request);
    return {
      request,
      headers: result.headers,
      status: result.status as any,
      parsedBody: JSON.parse(result.bodyAsText || "{}"),
    };
  };
}

function requestEntitiesRecognitionGeneral(
  pipeline: Pipeline,
  baseUrl: string
) {
  return async function (
    options: EntitiesRecognitionGeneralParameters & RequestParameters
  ): Promise<
    | EntitiesRecognitionGeneral200Response
    | EntitiesRecognitionGeneral400Response
    | EntitiesRecognitionGeneral500Response
  > {
    const httpClient = getCachedDefaultHttpsClient();
    const url = new URL(`${baseUrl}${"/entities/recognition/general"}`);
    options["model-version"] &&
      url.searchParams.append(
        "model-version",
        options["model-version"].toString()
      );
    options["showStats"] &&
      url.searchParams.append("showStats", options["showStats"].toString());
    options["stringIndexType"] &&
      url.searchParams.append(
        "stringIndexType",
        options["stringIndexType"].toString()
      );
    const body = { documents: options && options["documents"] };

    const headers = createHttpHeaders({
      accept: "application/json",
      "content-type": "application/json",
    });
    const request = createPipelineRequest({
      url: url.toString(),
      method: "POST",
      body: JSON.stringify(body),
      headers,
    });
    const result = await pipeline.sendRequest(httpClient, request);
    return {
      request,
      headers: result.headers,
      status: result.status as any,
      parsedBody: JSON.parse(result.bodyAsText || "{}"),
    };
  };
}

function requestEntitiesRecognitionPii(pipeline: Pipeline, baseUrl: string) {
  return async function (
    options: EntitiesRecognitionPiiParameters & RequestParameters
  ): Promise<
    | EntitiesRecognitionPii200Response
    | EntitiesRecognitionPii400Response
    | EntitiesRecognitionPii500Response
  > {
    const httpClient = getCachedDefaultHttpsClient();
    const url = new URL(`${baseUrl}${"/entities/recognition/pii"}`);
    options["model-version"] &&
      url.searchParams.append(
        "model-version",
        options["model-version"].toString()
      );
    options["showStats"] &&
      url.searchParams.append("showStats", options["showStats"].toString());
    options["domain"] &&
      url.searchParams.append("domain", options["domain"].toString());
    options["stringIndexType"] &&
      url.searchParams.append(
        "stringIndexType",
        options["stringIndexType"].toString()
      );
    const body = { documents: options && options["documents"] };

    const headers = createHttpHeaders({
      accept: "application/json",
      "content-type": "application/json",
    });
    const request = createPipelineRequest({
      url: url.toString(),
      method: "POST",
      body: JSON.stringify(body),
      headers,
    });
    const result = await pipeline.sendRequest(httpClient, request);
    return {
      request,
      headers: result.headers,
      status: result.status as any,
      parsedBody: JSON.parse(result.bodyAsText || "{}"),
    };
  };
}

function requestEntitiesLinking(pipeline: Pipeline, baseUrl: string) {
  return async function (
    options: EntitiesLinkingParameters & RequestParameters
  ): Promise<
    | EntitiesLinking200Response
    | EntitiesLinking400Response
    | EntitiesLinking500Response
  > {
    const httpClient = getCachedDefaultHttpsClient();
    const url = new URL(`${baseUrl}${"/entities/linking"}`);
    options["model-version"] &&
      url.searchParams.append(
        "model-version",
        options["model-version"].toString()
      );
    options["showStats"] &&
      url.searchParams.append("showStats", options["showStats"].toString());
    options["stringIndexType"] &&
      url.searchParams.append(
        "stringIndexType",
        options["stringIndexType"].toString()
      );
    const body = { documents: options && options["documents"] };

    const headers = createHttpHeaders({
      accept: "application/json",
      "content-type": "application/json",
    });
    const request = createPipelineRequest({
      url: url.toString(),
      method: "POST",
      body: JSON.stringify(body),
      headers,
    });
    const result = await pipeline.sendRequest(httpClient, request);
    return {
      request,
      headers: result.headers,
      status: result.status as any,
      parsedBody: JSON.parse(result.bodyAsText || "{}"),
    };
  };
}

function requestKeyPhrases(pipeline: Pipeline, baseUrl: string) {
  return async function (
    options: KeyPhrasesParameters & RequestParameters
  ): Promise<
    KeyPhrases200Response | KeyPhrases400Response | KeyPhrases500Response
  > {
    const httpClient = getCachedDefaultHttpsClient();
    const url = new URL(`${baseUrl}${"/keyPhrases"}`);
    options["model-version"] &&
      url.searchParams.append(
        "model-version",
        options["model-version"].toString()
      );
    options["showStats"] &&
      url.searchParams.append("showStats", options["showStats"].toString());
    const body = { documents: options && options["documents"] };

    const headers = createHttpHeaders({
      accept: "application/json",
      "content-type": "application/json",
    });
    const request = createPipelineRequest({
      url: url.toString(),
      method: "POST",
      body: JSON.stringify(body),
      headers,
    });
    const result = await pipeline.sendRequest(httpClient, request);
    return {
      request,
      headers: result.headers,
      status: result.status as any,
      parsedBody: JSON.parse(result.bodyAsText || "{}"),
    };
  };
}

function requestLanguages(pipeline: Pipeline, baseUrl: string) {
  return async function (
    options: LanguagesParameters & RequestParameters
  ): Promise<
    Languages200Response | Languages400Response | Languages500Response
  > {
    const httpClient = getCachedDefaultHttpsClient();
    const url = new URL(`${baseUrl}${"/languages"}`);
    options["model-version"] &&
      url.searchParams.append(
        "model-version",
        options["model-version"].toString()
      );
    options["showStats"] &&
      url.searchParams.append("showStats", options["showStats"].toString());
    const body = { documents: options && options["documents"] };

    const headers = createHttpHeaders({
      accept: "application/json",
      "content-type": "application/json",
    });
    const request = createPipelineRequest({
      url: url.toString(),
      method: "POST",
      body: JSON.stringify(body),
      headers,
    });
    const result = await pipeline.sendRequest(httpClient, request);
    return {
      request,
      headers: result.headers,
      status: result.status as any,
      parsedBody: JSON.parse(result.bodyAsText || "{}"),
    };
  };
}

function requestSentiment(pipeline: Pipeline, baseUrl: string) {
  return async function (
    options: SentimentParameters & RequestParameters
  ): Promise<
    Sentiment200Response | Sentiment400Response | Sentiment500Response
  > {
    const httpClient = getCachedDefaultHttpsClient();
    const url = new URL(`${baseUrl}${"/sentiment"}`);
    options["model-version"] &&
      url.searchParams.append(
        "model-version",
        options["model-version"].toString()
      );
    options["showStats"] &&
      url.searchParams.append("showStats", options["showStats"].toString());
    options["opinionMining"] &&
      url.searchParams.append(
        "opinionMining",
        options["opinionMining"].toString()
      );
    options["stringIndexType"] &&
      url.searchParams.append(
        "stringIndexType",
        options["stringIndexType"].toString()
      );
    const body = { documents: options && options["documents"] };

    const headers = createHttpHeaders({
      accept: "application/json",
      "content-type": "application/json",
    });
    const request = createPipelineRequest({
      url: url.toString(),
      method: "POST",
      body: JSON.stringify(body),
      headers,
    });
    const result = await pipeline.sendRequest(httpClient, request);
    return {
      request,
      headers: result.headers,
      status: result.status as any,
      parsedBody: JSON.parse(result.bodyAsText || "{}"),
    };
  };
}
export default createTextAnalyticsClient;
