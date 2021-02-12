import { HttpHeaders } from "@azure/core-https";
import {
  AnalyzeBatchInput,
  StringIndexType,
  MultiLanguageBatchInput,
  LanguageBatchInput,
} from "./models";

export type RequestParameters = {
  timeout?: number;
  headers?: HttpHeaders;
  body?: unknown;
  queryParameters?: { [key: string]: any };
};

export type AnalyzeParameters = RequestParameters & {
  body: AnalyzeBatchInput;
};

interface AnalyzeStatusParamProperties {
  $top?: number;
  $skip?: number;
  showStats?: boolean;
}

export type AnalyzeStatusParameters = RequestParameters & {
  queryParameters?: AnalyzeStatusParamProperties;
};

interface HealthStatusParamProperties {
  $top?: number;
  $skip?: number;
  showStats?: boolean;
}

export type HealthStatusParameters = RequestParameters & {
  queryParameters?: HealthStatusParamProperties;
};

interface CancelHealthJobParamProperties {}

export type CancelHealthJobParameters = RequestParameters &
  CancelHealthJobParamProperties;

interface HealthParamProperties {
  "model-version"?: string;
  stringIndexType?: StringIndexType;
}

export type HealthParameters = RequestParameters & {
  queryParameters?: HealthParamProperties;
  body: MultiLanguageBatchInput;
};

interface EntitiesRecognitionGeneralParamProperties {
  "model-version"?: string;
  showStats?: boolean;
  stringIndexType?: StringIndexType;
}

export type EntitiesRecognitionGeneralParameters = RequestParameters & {
  queryParameters?: EntitiesRecognitionGeneralParamProperties;
  body: MultiLanguageBatchInput;
};

interface EntitiesRecognitionPiiParamProperties {
  "model-version"?: string;
  showStats?: boolean;
  domain?: string;
  stringIndexType?: StringIndexType;
}

export type EntitiesRecognitionPiiParameters = RequestParameters & {
  queryParameters?: EntitiesRecognitionPiiParamProperties;
  body: MultiLanguageBatchInput;
};

interface EntitiesLinkingParamProperties {
  "model-version"?: string;
  showStats?: boolean;
  stringIndexType?: StringIndexType;
}

export type EntitiesLinkingParameters = RequestParameters & {
  queryParameters?: EntitiesLinkingParamProperties;
  body: MultiLanguageBatchInput;
};

interface KeyPhrasesParamProperties {
  "model-version"?: string;
  showStats?: boolean;
}

export type KeyPhrasesParameters = RequestParameters & {
  queryParameters?: KeyPhrasesParamProperties;
  body: MultiLanguageBatchInput;
};

interface LanguagesParamProperties {
  "model-version"?: string;
  showStats?: boolean;
}

export type LanguagesParameters = RequestParameters & {
  queryParameters?: LanguagesParamProperties;
  body: LanguageBatchInput;
};

interface SentimentParamProperties {
  "model-version"?: string;
  showStats?: boolean;
  opinionMining?: boolean;
  stringIndexType?: StringIndexType;
}

export interface SentimentParameters {
  queryParameters?: SentimentParamProperties;
  body: MultiLanguageBatchInput;
}
