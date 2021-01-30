import {
  bearerTokenAuthenticationPolicy,
  createPipelineFromOptions,
  createPipelineRequest,
  Pipeline,
  PipelineOptions,
  HttpsClient,
  DefaultHttpsClient,
  HttpMethods,
  createHttpHeaders,
} from "@azure/core-https";
import { TokenCredential } from "@azure/core-auth";
import {
  RequestInterface,
  RequestParameters,
  TextAnalyticsClient,
} from "./types/types";

let cachedHttpsClient: HttpsClient | undefined;
const DEFAULT_SCOPE = "https://cognitiveservices.azure.com/.default";
const ALLOWED_METHODS = [
  "GET",
  "PUT",
  "POST",
  "DELETE",
  "PATCH",
  "HEAD",
  "OPTIONS",
  "TRACE",
];

interface RouteInfo {
  verb: HttpMethods;
  path: string;
}

export function createTextAnalyticsClient(
  credentials: TokenCredential,
  endpoint: string,
  options: PipelineOptions = {}
): TextAnalyticsClient {
  const baseUrl = `${endpoint}text/analytics/v3.1-preview.3`;
  const pipeline = createDefaultPipeline(credentials, options);
  const httpClient = getCachedDefaultHttpsClient();

  return {
    request: (async (route: string, options: RequestParameters = {}) => {
      const { verb, path } = parseRoute(route);
      let usedParameters: string[] = [];
      let url: string = `${baseUrl}${path}`;

      const { urlParams, replacedUrl } = replaceUrlParams(url, options);

      url = replacedUrl;

      usedParameters.push(...urlParams);

      const { queryParams, urlWithQueryParams } = addQueryParams(
        verb,
        url,
        options,
        usedParameters
      );

      url = urlWithQueryParams;
      usedParameters.push(...queryParams);
      const headers = createHttpHeaders(options.headers);
      headers.set("content-type", "application/json");
      headers.set("accept", "application/json, text/json");
      const body: any = buildBody(options, usedParameters);
      const request = createPipelineRequest({
        url,
        method: verb,
        headers,
        body: JSON.stringify(body),
      });
      const result = await pipeline.sendRequest(httpClient, request);

      return {
        headers: result.headers,
        status: result.status,
        data: JSON.parse(result.bodyAsText || "{}"),
      };
    }) as RequestInterface,
  };
}

function addQueryParams(
  verb: HttpMethods,
  url: string,
  params: RequestParameters,
  usedParams: string[]
): { urlWithQueryParams: string; queryParams: string[] } {
  if (!["GET", "HEAD"].includes(verb)) {
    return { urlWithQueryParams: url, queryParams: [] };
  }

  const queryParams = getUnusedParams(params, usedParams);
  const parsed = new URL(url);

  for (const paramName of queryParams) {
    parsed.searchParams.append(paramName, params[paramName]);
  }

  return { urlWithQueryParams: parsed.toString(), queryParams };
}

function extractUrlParameters(url: string): string[] {
  const regExp = /\{(.*?)\}/g;

  const matches = url.match(regExp);

  if (!matches) {
    return [];
  }

  const urlParameters = new Set<string>();
  for (const match of matches) {
    urlParameters.add(match.replace("{", "").replace("}", ""));
  }

  return [...urlParameters];
}

function buildBody(params: RequestParameters, usedParams: string[]) {
  const body: any = {};
  const bodyProperties = getUnusedParams(params, usedParams);

  for (const property of bodyProperties) {
    body[property] = params[property];
  }

  return body;
}

function getUnusedParams(params: RequestParameters, usedParams: string[]) {
  return Object.keys(params).filter((key) => !usedParams.includes(key));
}

function replaceUrlParams(url: string, params: RequestParameters) {
  const urlParams = extractUrlParameters(url);
  let replacedUrl = url;

  for (const param of urlParams) {
    const value = params[param];

    if (!value) {
      throw new Error(`url parameter {${param}} has no value`);
    }

    replacedUrl = replacedUrl.replace(`{${param}}`, params[param]);
  }

  return { replacedUrl, urlParams };
}

export function getCachedDefaultHttpsClient(): HttpsClient {
  if (!cachedHttpsClient) {
    cachedHttpsClient = new DefaultHttpsClient();
  }

  return cachedHttpsClient;
}

function parseRoute(route: string): RouteInfo {
  if (!route) {
    throw new Error(`Invalid Route ${route}`);
  }

  const [verb, path] = route.split(" ");

  if (!isHttpMethod(verb)) {
    throw new Error(`Provided verb is not allowed ${verb}`);
  }

  if (!path) {
    throw new Error(`Invalid Route ${route}`);
  }

  return {
    verb,
    path,
  };
}

function isHttpMethod(verb: string): verb is HttpMethods {
  return ALLOWED_METHODS.includes(verb.toUpperCase());
}

function createDefaultPipeline(
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
