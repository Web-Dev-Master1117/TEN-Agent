import {
  AnalyzeBatchInput,
  StringIndexType,
  MultiLanguageBatchInput,
  LanguageBatchInput,
} from "./models";

export type AnalyzeParameters = AnalyzeBatchInput;

interface AnalyzeStatusParamProperties {
  jobId: string;
  showStats?: boolean;
  $top?: number;
  $skip?: number;
}

export type AnalyzeStatusParameters = AnalyzeStatusParamProperties;

interface HealthStatusParamProperties {
  jobId: string;
  $top?: number;
  $skip?: number;
  showStats?: boolean;
}

export type HealthStatusParameters = HealthStatusParamProperties;

interface CancelHealthJobParamProperties {
  jobId: string;
}

export type CancelHealthJobParameters = CancelHealthJobParamProperties;

interface HealthParamProperties {
  "model-version"?: string;
  stringIndexType?: StringIndexType;
}

export type HealthParameters = MultiLanguageBatchInput & HealthParamProperties;

interface EntitiesRecognitionGeneralParamProperties {
  "model-version"?: string;
  showStats?: boolean;
  stringIndexType?: StringIndexType;
}

export type EntitiesRecognitionGeneralParameters = MultiLanguageBatchInput &
  EntitiesRecognitionGeneralParamProperties;

interface EntitiesRecognitionPiiParamProperties {
  "model-version"?: string;
  showStats?: boolean;
  domain?: string;
  stringIndexType?: StringIndexType;
}

export type EntitiesRecognitionPiiParameters = MultiLanguageBatchInput &
  EntitiesRecognitionPiiParamProperties;

interface EntitiesLinkingParamProperties {
  "model-version"?: string;
  showStats?: boolean;
  stringIndexType?: StringIndexType;
}

export type EntitiesLinkingParameters = MultiLanguageBatchInput &
  EntitiesLinkingParamProperties;

interface KeyPhrasesParamProperties {
  "model-version"?: string;
  showStats?: boolean;
}

export type KeyPhrasesParameters = MultiLanguageBatchInput &
  KeyPhrasesParamProperties;

interface LanguagesParamProperties {
  "model-version"?: string;
  showStats?: boolean;
}

export type LanguagesParameters = LanguageBatchInput & LanguagesParamProperties;

interface SentimentParamProperties {
  "model-version"?: string;
  showStats?: boolean;
  opinionMining?: boolean;
  stringIndexType?: StringIndexType;
}

export type SentimentParameters = MultiLanguageBatchInput &
  SentimentParamProperties;
