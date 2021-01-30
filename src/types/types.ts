/** Generic Types */

import { HttpHeaders, RawHttpHeaders } from "@azure/core-https";
import { MethodsMap, Route } from "./typeConstants";
import { ExtractResponse, ToParameters } from "./typeHelpers";

export declare type BasicResponse<T, S extends number = number> = {
  headers: HttpHeaders;
  status: S;
  url: string;
  data: T;
};

export interface RequestParameters {
  baseUrl?: string;
  headers?: RawHttpHeaders;
  /**
   * Any additional parameter will be passed as follows
   * 1. URL parameter if `':parameter'` or `{parameter}` is part of `url`
   * 2. Query parameter if `method` is `'GET'` or `'HEAD'`
   * 3. Request body if `parameter` is `'data'`
   * 4. JSON in the request body in the form of `body[parameter]` unless `parameter` key is `'data'`
   */
  [parameter: string]: any;
}

declare type Operation<
  Url extends keyof paths,
  Method extends keyof paths[Url]
> = {
  parameters: ToParameters<paths[Url][Method]>;
  request: {
    method: Method extends keyof MethodsMap ? MethodsMap[Method] : never;
    url: Url;
    headers: HttpHeaders;
    request: { [option: string]: any };
  };
  response: ExtractResponse<paths[Url][Method]>;
};

export interface RequestInterface {
  <R extends Route>(
    route: keyof Endpoints | R,
    options?: R extends keyof Endpoints
      ? Endpoints[R]["parameters"] & RequestParameters
      : RequestParameters
  ): R extends keyof Endpoints
    ? Promise<Endpoints[R]["response"]>
    : Promise<BasicResponse<any>>;
}

/** SDK Specific definitions */

export interface TextAnalyticsClient {
  request: RequestInterface;
}

interface Endpoints {
  "POST /analyze": Operation<"/analyze", "post">;
  "GET /analyze/jobs/{jobId}": Operation<"/analyze/jobs/{jobId}", "get">;
  "GET /entities/health/jobs/{jobId}": Operation<
    "/entities/health/jobs/{jobId}",
    "get"
  >;
  "DELETE /entities/health/jobs/{jobId}": Operation<
    "/entities/health/jobs/{jobId}",
    "delete"
  >;
  "POST /entities/health/jobs": Operation<"/entities/health/jobs", "post">;
  "POST /entities/recognition/general": Operation<
    "/entities/recognition/general",
    "post"
  >;
  "POST /entities/recognition/pii": Operation<
    "/entities/recognition/pii",
    "post"
  >;
  "POST /entities/linking": Operation<"/entities/linking", "post">;
  "POST /keyPhrases": Operation<"/keyPhrases", "post">;
  "POST /languages": Operation<"/languages", "post">;
  "POST /sentiment": Operation<"/sentiment", "post">;
}

interface paths {
  "/analyze": { post: operations["analyze"] };
  "/analyze/jobs/{jobId}": { get: operations["analyzeStatus"] };
  "/entities/health/jobs/{jobId}": {
    get: operations["healthStatus"];
    delete: operations["cancelHealthJob"];
  };
  "/entities/health/jobs": { post: operations["health"] };
  "/entities/recognition/general": {
    post: operations["entitiesRecognitionGeneral"];
  };
  "/entities/recognition/pii": { post: operations["entitiesRecognitionPii"] };
  "/entities/linking": { post: operations["entitiesLinking"] };
  "/keyPhrases": { post: operations["keyPhrases"] };
  "/languages": { post: operations["languages"] };
  "/sentiment": { post: operations["sentiment"] };
}

interface operations {
  analyze: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["analizeBatchInput"];
      };
    };
    responses: {
      202: {
        headers: { "Operation-Location"?: string };
      };
    };
  };
  analyzeStatus: {
    parameters: {
      path: { jobId: components["parameters"]["analyzeJobId"] };
      query: {
        showStats?: components["parameters"]["showStats"];
        top?: number /**default: 20 */;
        skip?: number /**default: 0 */;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["analyzeJobState"];
        };
      };
    };
  };
  healthStatus: {
    parameters: {
      path: { jobId: components["parameters"]["jobId"] };
      query: {
        showStats?: components["parameters"]["showStats"];
        top?: number /**default: 20 */;
        skip?: number /**default: 0 */;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["healthcareJobState"];
        };
      };
    };
  };
  cancelHealthJob: {
    parameters: { path: { jobId: components["parameters"]["jobId"] } };
    responses: {
      202: {
        headers: { "Operation-Location"?: string };
      };
    };
  };
  health: {
    parameters: {
      query: {
        modelVersion?: components["parameters"]["modelVersion"];
        stringIndexType?: components["parameters"]["stringIndexType"];
      };
    };
    requestBody: {
      content: {
        "application/json": {
          documents: components["schemas"]["multiLanguageInput"];
        };
      };
    };
    responses: {
      202: {
        headers: { "Operation-Location"?: string };
      };
    };
  };
  entitiesRecognitionGeneral: {
    parameters: {
      query: {
        modelVersion?: components["parameters"]["modelVersion"];
        stringIndexType?: components["parameters"]["stringIndexType"];
        showStats?: components["parameters"]["showStats"];
      };
    };
    requestBody: {
      content: {
        "application/json": {
          documents: components["schemas"]["multiLanguageInput"];
        };
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["entitiesResult"];
        };
      };
    };
  };
  entitiesRecognitionPii: {
    parameters: {
      query: {
        modelVersion?: components["parameters"]["modelVersion"];
        showStats?: components["parameters"]["showStats"];
        stringIndexType?: components["parameters"]["stringIndexType"];
        domain?: string;
      };
    };
    requestBody: {
      content: {
        "application/json": {
          documents: components["schemas"]["multiLanguageInput"];
        };
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["piiResult"];
        };
      };
    };
  };
  entitiesLinking: {
    parameters: {
      query: {
        modelVersion?: components["parameters"]["modelVersion"];
        showStats?: components["parameters"]["showStats"];
        stringIndexType?: components["parameters"]["stringIndexType"];
      };
    };
    requestBody: {
      content: {
        "application/json": {
          documents: components["schemas"]["multiLanguageInput"];
        };
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["entityLinkingResult"];
        };
      };
    };
  };
  keyPhrases: {
    parameters: {
      query: {
        modelVersion?: components["parameters"]["modelVersion"];
        showStats?: components["parameters"]["showStats"];
      };
    };
    requestBody: {
      content: {
        "application/json": {
          documents: components["schemas"]["multiLanguageInput"];
        };
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["keyPhraseResult"][];
        };
      };
    };
  };
  languages: {
    parameters: {
      query: {
        modelVersion?: components["parameters"]["modelVersion"];
        showStats?: components["parameters"]["showStats"];
      };
    };
    requestBody: {
      content: {
        "application/json": {
          documents: components["parameters"]["languageInput"];
        };
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["languageResult"];
        };
      };
    };
  };
  sentiment: {
    parameters: {
      query: {
        modelVersion?: components["parameters"]["modelVersion"];
        showStats?: components["parameters"]["showStats"];
        stringIndexType?: components["parameters"]["stringIndexType"];
        opinionMining?: boolean;
      };
    };
    requestBody: {
      content: {
        "application/json": {
          documents: components["schemas"]["multiLanguageInput"];
        };
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["sentimentResponse"];
        };
      };
    };
  };
}

interface components {
  schemas: {
    sentimentResponse: {
      documents: components["schemas"]["documentSentiment"][];
      errors: components["schemas"]["documentError"][];
      modelVersion: string;
      statistics?: components["schemas"]["requestStatistics"];
    };
    documentSentiment: {
      id: string;
      sentiment: "positive" | "neutral" | "negative" | "mixed";
      confidenceScores: components["schemas"]["sentimentConfidenceScorePerLabel"];
      sentences: components["schemas"]["sentenceSentiment"][];
      warnings: components["schemas"]["textAnalyticsWarning"][];
      statistics?: components["schemas"]["documentStatistics"];
    };
    sentenceSentiment: {
      text: string;
      sentiment: "positive" | "neutral" | "negative";
      confidenceScores: components["schemas"]["sentimentConfidenceScorePerLabel"];
      offset: number;
      length: number;
      aspects?: components["schemas"]["sentenceAspect"][];
      opinions?: components["schemas"]["sentenceOpinion"][];
    };
    sentenceAspect: {
      confidenceScores: components["schemas"]["aspectConfidenceScoreLabel"];
      length: number;
      offset: number;
      relations: components["schemas"]["aspectRelation"][];
      sentiment: "positive" | "negative" | "mixed";
      text: string;
    };
    aspectRelation: {
      ref: string;
      relationType: "opinion" | "aspect";
    };
    aspectConfidenceScoreLabel: {
      negative: number;
      positive: number;
    };
    sentenceOpinion: {
      confidenceScores: components["schemas"]["aspectConfidenceScoreLabel"];
      isNegated: boolean;
      length: number;
      offset: number;
      sentiment: "positive" | "negative" | "mixed";
      text: string;
    };
    sentimentConfidenceScorePerLabel: {
      negative: number;
      positive: number;
      neutral: number;
    };
    languageResult: {
      documents: components["schemas"]["documentLanguage"][];
      errors: components["schemas"]["documentError"][];
      modelVersion: string;
      statistics?: components["schemas"]["requestStatistics"];
    };
    documentLanguage: {
      id: string;
      detectedLanguage: components["schemas"]["detectedLanguage"];
      warnings: components["schemas"]["textAnalyticsWarning"][];
      statistics?: components["schemas"]["documentStatistics"];
    };
    detectedLanguage: {
      name: string;
      iso6391Name: string;
      confidenceScore: number;
    };
    entityLinkingResult: {
      documents: components["schemas"]["documentLinkedEntities"][];
      errors: components["schemas"]["documentError"][];
      modelVersion: string;
      statistics?: components["schemas"]["requestStatistics"];
    };
    documentLinkedEntities: {
      id: string;
      entities: components["schemas"]["linkedEntity"][];
      warnings: components["schemas"]["textAnalyticsWarning"][];
      statistics?: components["schemas"]["documentStatistics"];
    };
    linkedEntity: {
      name: string;
      matches: components["schemas"]["match"][];
      language: string;
      url: string;
      dataSource: string;
      bingId: string;
      id: string;
    };
    match: {
      confidenceScore: number;
      text: string;
      offset: number;
      length: number;
    };
    healthcareJobState: components["schemas"]["jobMetadata"] &
      components["schemas"]["pagination"] & {
        results?: components["schemas"]["healthcareResult"][];
        errors?: components["schemas"]["textAnalyticsError"][];
      };
    healthcareResult: {
      documents: components["schemas"]["documentHealthcareEntities"][];
      errors: components["schemas"]["documentError"][];
      modelVersion: string;
      statistics?: components["schemas"]["requestStatistics"];
    };
    documentHealthcareEntities: {
      id: string;
      entities: components["schemas"]["healthcareEntity"][];
      relations: components["schemas"]["healthcareRelation"][];
      warnings: components["schemas"]["textAnalyticsWarning"][];
      statistics?: components["schemas"]["documentStatistics"];
    };
    healthcareEntity: components["schemas"]["entity"] & {
      isNegated: boolean;
      links?: components["schemas"]["healthcareEntityLink"][];
    };
    healthcareRelation: {
      relationType: string;
      bidirectional: boolean;
      source: string;
      target: string;
    };
    healthcareEntityLink: {
      dataSource: string;
      id: string;
    };
    analizeBatchInput: components["schemas"]["jobDescriptor"] & {
      analysisInput: components["schemas"]["multiLanguageBatchInput"];
    };
    analyzeJobState: components["schemas"]["jobMetadata"] &
      components["schemas"]["tasksState"] &
      components["schemas"]["pagination"] & {
        errors?: components["schemas"]["textAnalyticsError"][];
        statistics?: components["schemas"]["requestStatistics"];
      };
    multiLanguageBatchInput: {
      documents: components["schemas"]["multiLanguageInput"][];
    };
    pagination: { nextLink?: string };
    requestStatistics: {
      documentsCount: number;
      validDocumentsCount: number;
      erroneousDocumentsCount: number;
      transactionsCount: number;
    };
    textAnalyticsError: {
      code:
        | "InvalidRequest"
        | "InvalidArgument"
        | "InternalServerError"
        | "ServiceUnavailable"
        | "NotFound";
      message: string;
      target?: string;
      innerError?: components["schemas"]["innerError"];
      details?: components["schemas"]["textAnalyticsError"][];
    };
    innerError: {
      code: string;
      message: string;
      details?: {
        [key: string]: string;
      };
      target?: string;
      innerError?: components["schemas"]["innerError"];
    };
    jobMetadata: {
      createdDateTime: string;
      jobId: string;
      lastUpdateDateTime: string;
      status:
        | "notStarted"
        | "running"
        | "succeeded"
        | "failed"
        | "cancelled"
        | "cancelling"
        | "partiallyCompleted"
        | "partiallySucceeded";
      displayName?: string;
      expirationDateTime?: string;
    };

    tasksState: {
      tasks: {
        completed: number;
        total: number;
        failed: number;
        inProgress: number;
        details?: components["schemas"]["taskState"];
        entityRecognitionTasks?: components["schemas"]["taskState"] &
          {
            results: components["schemas"]["entitiesResult"];
          }[];
        entityRecognitionPiiTasks?: components["schemas"]["taskState"] &
          { results: components["schemas"]["piiResult"] }[];
        keyPhraseExtractionTasks?: components["schemas"]["taskState"] &
          { results: components["schemas"]["keyPhraseResult"] }[];
      };
    };
    keyPhraseResult: {
      documents: components["schemas"]["documentKeyPhrases"][];
      errors: components["schemas"]["documentError"][];
      modelVersion: string;
      statistics?: components["schemas"]["documentError"];
    };
    documentError: {
      id: string;
      error: components["schemas"]["textAnalyticsError"];
    };
    documentKeyPhrases: {
      id: string;
      keyPhrases: string[];
      warnings: components["schemas"]["textAnalyticsWarning"][];
      statistics?: components["schemas"]["documentStatistics"];
    };
    documentStatistics: {
      charactersCount: number;
      transactionsCount: number;
    };
    textAnalyticsWarning: {
      code: string;
      message: string;
      targetRef: string;
    };
    piiResult: {
      documents: components["schemas"]["piiDocumentEntities"][];
      errors: components["schemas"]["documentError"][];
      modelVersion: string;
      statistics?: components["schemas"]["requestStatistics"];
    };
    piiDocumentEntities: {
      id: string;
      redactedText: string;
      entities: components["schemas"]["entity"][];
      warnings: components["schemas"]["textAnalyticsWarning"][];
      statistics?: components["schemas"]["documentStatistics"];
    };
    entity: {
      text: string;
      category: string;
      offset: number;
      length: number;
      confidenceScore: number;
      subcategory: string;
    };
    taskState: {
      status:
        | "notStarted"
        | "running"
        | "succeeded"
        | "failed"
        | "rejected"
        | "cancelled"
        | "cancelling";
      lastUpdateDateTime: string;
      name?: string;
    };
    entitiesResult: {
      documents: components["schemas"]["documentEntities"][];
      errors: components["schemas"]["documentError"][];
      modelVersion: string;
      statistics?: components["schemas"]["requestStatistics"];
    };
    documentEntities: {
      id: string;
      entities: components["schemas"]["entity"][];
      warnings: components["schemas"]["textAnalyticsWarning"][];
      statistics?: components["schemas"]["documentStatistics"];
    };
    jobDescriptor: {
      displayName?: string;
    };
    multiLanguageInput: {
      id: string;
      text: string;
    }[];
    languageBatchInput: components["schemas"]["languageInput"][];
    languageInput: {
      id: string;
      text: string;
      language?: string;
    };
  };
  parameters: {
    languageInput: components["schemas"]["languageBatchInput"];
    jobId: string;
    stringIndexType: string;
    analyzeJobId: string;
    showStats: boolean;
    modelVersion: string;
  };
}
