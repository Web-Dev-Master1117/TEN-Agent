import {
  PipelineOptions,
  createPipelineRequest,
  createHttpHeaders,
  HttpMethods,
  Pipeline,
} from "@azure/core-https";
import { TokenCredential } from "@azure/core-auth";
import {
  AnalyzeParameters,
  AnalyzeStatusParameters,
  HealthStatusParameters,
  HealthParameters,
  EntitiesRecognitionGeneralParameters,
  EntitiesRecognitionPiiParameters,
  EntitiesLinkingParameters,
  KeyPhrasesParameters,
  LanguagesParameters,
  SentimentParameters,
  CancelHealthJobParameters,
  RequestParameters,
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
  PipelineResponse,
} from "./responses";
import {
  createDefaultPipeline,
  getCachedDefaultHttpsClient,
} from "./clientHelpers";

/**
 * Definition of each operation to help building their types
 */
interface Routes {
  "POST /analyze": {
    options: AnalyzeParameters;
    response: Promise<
      Analyze202Response | Analyze400Response | Analyze500Response
    >;
    pathParameters: [];
  };
  "GET /analyze/jobs/{jobId}": {
    options: AnalyzeStatusParameters;
    response: Promise<
      | AnalyzeStatus200Response
      | AnalyzeStatus404Response
      | AnalyzeStatus500Response
    >;
    pathParameters: [jobId: string];
  };
  "GET /entities/health/jobs/{jobId}": {
    options: HealthStatusParameters;
    response: Promise<
      | HealthStatus200Response
      | HealthStatus404Response
      | HealthStatus500Response
    >;
    pathParameters: [jobId: string];
  };
  "DELETE /entities/health/jobs/{jobId}": {
    options: CancelHealthJobParameters;
    response: Promise<
      | CancelHealthJob202Response
      | CancelHealthJob404Response
      | CancelHealthJob500Response
    >;
    pathParameters: [jobId: string];
  };
  "POST /entities/health/jobs": {
    options: HealthParameters;
    response: Promise<
      Health202Response | Health400Response | Health500Response
    >;
    pathParameters: [];
  };
  "POST /entities/recognition/general": {
    options: EntitiesRecognitionGeneralParameters;
    response: Promise<
      | EntitiesRecognitionGeneral200Response
      | EntitiesRecognitionGeneral400Response
      | EntitiesRecognitionGeneral500Response
    >;
    pathParameters: [];
  };
  "POST /entities/recognition/pii": {
    options: EntitiesRecognitionPiiParameters;
    response: Promise<
      | EntitiesRecognitionPii200Response
      | EntitiesRecognitionPii400Response
      | EntitiesRecognitionPii500Response
    >;
    pathParameters: [];
  };
  "POST /entities/linking": {
    options: EntitiesLinkingParameters;
    response: Promise<
      | EntitiesLinking200Response
      | EntitiesLinking400Response
      | EntitiesLinking500Response
    >;
    pathParameters: [];
  };
  "POST /keyPhrases": {
    options: KeyPhrasesParameters;
    response: Promise<
      KeyPhrases200Response | KeyPhrases400Response | KeyPhrases500Response
    >;
    pathParameters: [];
  };
  "POST /languages": {
    options: LanguagesParameters;
    response: Promise<
      Languages200Response | Languages400Response | Languages500Response
    >;
    pathParameters: [];
  };
  "POST /sentiment": {
    options: SentimentParameters;
    response: Promise<
      Sentiment200Response | Sentiment400Response | Sentiment500Response
    >;
    pathParameters: [];
  };
}

// Calulates the parameters needed in string, parameters are enclosed by {}
// This is used to
type RouteParams<
  TRoute extends string
> = TRoute extends `${infer _Head}{${infer _Param}}${infer Tail}`
  ? [pathParam: string, ...pathParam: RouteParams<Tail>]
  : TRoute extends `${infer _Head}{${infer _Param}}`
  ? [string]
  : [];

// Checks if a given object contains any required properties
type AnyRequired<T> = {} extends T ? false : true;

/**
 * Calculates the type of the options bag, also decides if it needs to be marked as required or optional.
 */
type RequestOptions<T extends keyof Routes> = AnyRequired<
  Routes[T]["options"]
> extends false
  ? [options?: Routes[T]["options"]]
  : [options: Routes[T]["options"]];

/**
 * Request operation's arguments.
 * These arguments can be positional parameters to fill in the path template,
 * and also figures out if the options parameter should be marked as required or not
 * depending of whether or not there is a required property in the options
 */
type RequestArgs<T extends keyof Routes> = Routes[T]["pathParameters"] extends [

]
  ? RequestOptions<T>
  : AnyRequired<Routes[T]["options"]> extends false
  ? [
      ...pathParameters: Routes[T]["pathParameters"],
      options?: Routes[T]["options"]
    ]
  : [
      ...pathParameters: Routes[T]["pathParameters"],
      options: Routes[T]["options"]
    ];

/**
 * Type of the requestUnchecked function parameters. Figures out if it needs to add positional parameters for
 * filling out pathParameters by parsing the route string.
 */
type RequestUncheckedArgs<T extends string> = [
  ...pathParameters: RouteParams<T>,
  options?: RequestParameters
];

/**
 * Definition of the request function, it can include positional parameters
 * to fill out the url template.
 * It also adds the options bag to provide a body, queryParameters or headers
 */
type Request = {
  <T extends keyof Routes>(
    route: T,
    ...args: RequestArgs<T>
  ): Routes[T]["response"];
};

/**
 * Definition of the requestUnchecked function, it can include positional parameters
 * to fill out the url template, by parsing the route provided.
 * It als adds an optional options bag to provide a body, queryParameters or headers
 */
type RequestUnchecked = {
  <T extends string>(
    route: T,
    ...args: RequestUncheckedArgs<T>
  ): Promise<PipelineResponse>;
};

/**
 * Interface that defines the TextAnalytics client
 */
export interface TextAnalyticsClient {
  request: Request;
  requestUnchecked: RequestUnchecked;
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

  const client: TextAnalyticsClient = {
    request: async (route, ...args) => {
      const argumentsDetails = extractArguments(args);
      const result = await sendRequest(
        baseUrl,
        pipeline,
        route,
        argumentsDetails
      );
      return result;
    },
    requestUnchecked: async (route, ...args) => {
      const argumentsDetails = extractArguments(args);
      const result = await sendRequest(
        baseUrl,
        pipeline,
        route,
        argumentsDetails
      );
      return result;
    },
  };

  return client;
}

async function sendRequest<R extends keyof Routes>(
  baseUrl: string,
  pipeline: Pipeline,
  route: R | string,
  argumentsDetails: ExtractedArguments<R>
) {
  const httpClient = getCachedDefaultHttpsClient();
  const routeDetails = extractRouteDetails(route);
  const url = buildRequestUrl(
    baseUrl,
    routeDetails.path,
    argumentsDetails.pathParameters,
    argumentsDetails.options
  );

  const headers = createHttpHeaders({
    accept: "application/json",
    "content-type": "application/json",
    ...(argumentsDetails.options.headers
      ? argumentsDetails.options.headers.toJSON()
      : {}),
  });

  let body = undefined;

  if (argumentsDetails.options.body) {
    body = JSON.stringify(argumentsDetails.options.body);
  }

  const request = createPipelineRequest({
    url: url.toString(),
    method: routeDetails.method,
    body,
    headers,
  });

  const result = await pipeline.sendRequest(httpClient, request);

  return {
    request,
    headers: result.headers,
    status: result.status as any,
    body: JSON.parse(result.bodyAsText || "{}"),
  };
}

interface ExtractedArguments<R extends keyof Routes> {
  options: Routes[R]["options"] & RequestParameters;
  pathParameters: string[];
}

function extractArguments<R extends keyof Routes>(
  ...args: RequestArgs<R>
): ExtractedArguments<R> {
  let options: Routes[R]["options"] = undefined;
  let pathParameters: string[] = [];
  for (const arg of args) {
    if (Array.isArray(arg)) {
      for (const item of arg) {
        if (typeof item === "string") {
          pathParameters.push(item);
        } else {
          options = item;
        }
      }
    }
    break;
  }

  return {
    options,
    pathParameters,
  };
}

interface RouteDetails {
  method: HttpMethods;
  path: string;
}

function extractRouteDetails(route: string): RouteDetails {
  if (!route) {
    throw new Error(`route cannot be undefined or empty`);
  }

  const parts = route.split(" ") as [HttpMethods, string];

  const supportedMethods = [
    "GET",
    "PUT",
    "POST",
    "DELETE",
    "PATCH",
    "HEAD",
    "OPTIONS",
    "TRACE",
  ];

  if (parts.length !== 2) {
    throw new Error(
      `Unexpected route format for ${route}\n The expected format is "<VERB> <PATH>" i.e "POST /foo" `
    );
  }
  const [method, path] = parts;

  if (!supportedMethods.includes(method.toUpperCase())) {
    throw new Error(
      `Unexpected method: ${method}\n Supported methods: ${JSON.stringify(
        supportedMethods
      )} `
    );
  }

  return {
    method: method,
    path,
  };
}

function buildRequestUrl<R extends keyof Routes>(
  baseUrl: string,
  routePath: string,
  pathParameters: string[],
  options: Routes[R]["options"] = {}
): string {
  let path = routePath;
  for (const pathParam of pathParameters) {
    path = path.replace(/{.*?}/, pathParam);
  }

  const url = new URL(`${baseUrl}/${path}`);

  if (options.queryParameters) {
    const queryParams = options.queryParameters || {};
    for (const key of Object.keys(queryParams)) {
      url.searchParams.append(key, queryParams[key]);
    }
  }

  return url.toString();
}

export default createTextAnalyticsClient;
