import {
  ErrorResponse,
  AnalyzeJobState,
  HealthcareJobState,
  EntitiesResult,
  PiiResult,
  EntityLinkingResult,
  KeyPhraseResult,
  LanguageResult,
  SentimentResponse,
} from "./models";
import { PipelineResponse, HttpHeaders } from "@azure/core-https";

interface Analyze202Headers {
  "Operation-Location"?: string;
}

export type Analyze202Response = Analyze202Properties & PipelineResponse;

interface Analyze202Properties {
  status: 202;
  headers: Analyze202Headers & HttpHeaders;
}

export type Analyze400Response = Analyze400Properties & PipelineResponse;

interface Analyze400Properties {
  status: 400;
  parsedBody: ErrorResponse;
}

export type Analyze500Response = Analyze500Properties & PipelineResponse;

interface Analyze500Properties {
  status: 500;
  parsedBody: ErrorResponse;
}

export type AnalyzeStatus200Response = AnalyzeStatus200Properties &
  PipelineResponse;

interface AnalyzeStatus200Properties {
  status: 200;
  parsedBody: AnalyzeJobState;
}

export type AnalyzeStatus404Response = AnalyzeStatus404Properties &
  PipelineResponse;

interface AnalyzeStatus404Properties {
  status: 404;
  parsedBody: ErrorResponse;
}

export type AnalyzeStatus500Response = AnalyzeStatus500Properties &
  PipelineResponse;

interface AnalyzeStatus500Properties {
  status: 500;
  parsedBody: ErrorResponse;
}

export type HealthStatus200Response = HealthStatus200Properties &
  PipelineResponse;

interface HealthStatus200Properties {
  status: 200;
  parsedBody: HealthcareJobState;
}

export type HealthStatus404Response = HealthStatus404Properties &
  PipelineResponse;

interface HealthStatus404Properties {
  status: 404;
  parsedBody: ErrorResponse;
}

export type HealthStatus500Response = HealthStatus500Properties &
  PipelineResponse;

interface HealthStatus500Properties {
  status: 500;
  parsedBody: ErrorResponse;
}

interface CancelHealthJob202Headers {
  "Operation-Location"?: string;
}

export type CancelHealthJob202Response = CancelHealthJob202Properties &
  PipelineResponse;

interface CancelHealthJob202Properties {
  status: 202;
  headers: CancelHealthJob202Headers & HttpHeaders;
}

export type CancelHealthJob404Response = CancelHealthJob404Properties &
  PipelineResponse;

interface CancelHealthJob404Properties {
  status: 404;
  parsedBody: ErrorResponse;
}

export type CancelHealthJob500Response = CancelHealthJob500Properties &
  PipelineResponse;

interface CancelHealthJob500Properties {
  status: 500;
  parsedBody: ErrorResponse;
}

interface Health202Headers {
  "Operation-Location"?: string;
}

export type Health202Response = Health202Properties & PipelineResponse;

interface Health202Properties {
  status: 202;
  headers: Health202Headers & HttpHeaders;
}

export type Health400Response = Health400Properties & PipelineResponse;

interface Health400Properties {
  status: 400;
  parsedBody: ErrorResponse;
}

export type Health500Response = Health500Properties & PipelineResponse;

interface Health500Properties {
  status: 500;
  parsedBody: ErrorResponse;
}

export type EntitiesRecognitionGeneral200Response = EntitiesRecognitionGeneral200Properties &
  PipelineResponse;

interface EntitiesRecognitionGeneral200Properties {
  status: 200;
  parsedBody: EntitiesResult;
}

export type EntitiesRecognitionGeneral400Response = EntitiesRecognitionGeneral400Properties &
  PipelineResponse;

interface EntitiesRecognitionGeneral400Properties {
  status: 400;
  parsedBody: ErrorResponse;
}

export type EntitiesRecognitionGeneral500Response = EntitiesRecognitionGeneral500Properties &
  PipelineResponse;

interface EntitiesRecognitionGeneral500Properties {
  status: 500;
  parsedBody: ErrorResponse;
}

export type EntitiesRecognitionPii200Response = EntitiesRecognitionPii200Properties &
  PipelineResponse;

interface EntitiesRecognitionPii200Properties {
  status: 200;
  parsedBody: PiiResult;
}

export type EntitiesRecognitionPii400Response = EntitiesRecognitionPii400Properties &
  PipelineResponse;

interface EntitiesRecognitionPii400Properties {
  status: 400;
  parsedBody: ErrorResponse;
}

export type EntitiesRecognitionPii500Response = EntitiesRecognitionPii500Properties &
  PipelineResponse;

interface EntitiesRecognitionPii500Properties {
  status: 500;
  parsedBody: ErrorResponse;
}

export type EntitiesLinking200Response = EntitiesLinking200Properties &
  PipelineResponse;

interface EntitiesLinking200Properties {
  status: 200;
  parsedBody: EntityLinkingResult;
}

export type EntitiesLinking400Response = EntitiesLinking400Properties &
  PipelineResponse;

interface EntitiesLinking400Properties {
  status: 400;
  parsedBody: ErrorResponse;
}

export type EntitiesLinking500Response = EntitiesLinking500Properties &
  PipelineResponse;

interface EntitiesLinking500Properties {
  status: 500;
  parsedBody: ErrorResponse;
}

export type KeyPhrases200Response = KeyPhrases200Properties & PipelineResponse;

interface KeyPhrases200Properties {
  status: 200;
  parsedBody: KeyPhraseResult;
}

export type KeyPhrases400Response = KeyPhrases400Properties & PipelineResponse;

interface KeyPhrases400Properties {
  status: 400;
  parsedBody: ErrorResponse;
}

export type KeyPhrases500Response = KeyPhrases500Properties & PipelineResponse;

interface KeyPhrases500Properties {
  status: 500;
  parsedBody: ErrorResponse;
}

export type Languages200Response = Languages200Properties & PipelineResponse;

interface Languages200Properties {
  status: 200;
  parsedBody: LanguageResult;
}

export type Languages400Response = Languages400Properties & PipelineResponse;

interface Languages400Properties {
  status: 400;
  parsedBody: ErrorResponse;
}

export type Languages500Response = Languages500Properties & PipelineResponse;

interface Languages500Properties {
  status: 500;
  parsedBody: ErrorResponse;
}

export type Sentiment200Response = Sentiment200Properties & PipelineResponse;

interface Sentiment200Properties {
  status: 200;
  parsedBody: SentimentResponse;
}

export type Sentiment400Response = Sentiment400Properties & PipelineResponse;

interface Sentiment400Properties {
  status: 400;
  parsedBody: ErrorResponse;
}

export type Sentiment500Response = Sentiment500Properties & PipelineResponse;

interface Sentiment500Properties {
  status: 500;
  parsedBody: ErrorResponse;
}
