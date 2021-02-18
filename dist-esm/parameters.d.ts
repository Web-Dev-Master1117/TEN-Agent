import { HttpHeaders } from "@azure/core-https";
import { AnalyzeBatchInput, StringIndexType, MultiLanguageBatchInput, LanguageBatchInput } from "./models";
export declare type RequestParameters = {
    timeout?: number;
    headers?: HttpHeaders;
    body?: unknown;
    queryParameters?: {
        [key: string]: any;
    };
};
export declare type AnalyzeParameters = RequestParameters & {
    body: AnalyzeBatchInput;
};
interface AnalyzeStatusParamProperties {
    $top?: number;
    $skip?: number;
    showStats?: boolean;
}
export declare type AnalyzeStatusParameters = RequestParameters & {
    queryParameters?: AnalyzeStatusParamProperties;
};
interface HealthStatusParamProperties {
    $top?: number;
    $skip?: number;
    showStats?: boolean;
}
export declare type HealthStatusParameters = RequestParameters & {
    queryParameters?: HealthStatusParamProperties;
};
interface CancelHealthJobParamProperties {
}
export declare type CancelHealthJobParameters = RequestParameters & CancelHealthJobParamProperties;
interface HealthParamProperties {
    "model-version"?: string;
    stringIndexType?: StringIndexType;
}
export declare type HealthParameters = RequestParameters & {
    queryParameters?: HealthParamProperties;
    body: MultiLanguageBatchInput;
};
interface EntitiesRecognitionGeneralParamProperties {
    "model-version"?: string;
    showStats?: boolean;
    stringIndexType?: StringIndexType;
}
export declare type EntitiesRecognitionGeneralParameters = RequestParameters & {
    queryParameters?: EntitiesRecognitionGeneralParamProperties;
    body: MultiLanguageBatchInput;
};
interface EntitiesRecognitionPiiParamProperties {
    "model-version"?: string;
    showStats?: boolean;
    domain?: string;
    stringIndexType?: StringIndexType;
}
export declare type EntitiesRecognitionPiiParameters = RequestParameters & {
    queryParameters?: EntitiesRecognitionPiiParamProperties;
    body: MultiLanguageBatchInput;
};
interface EntitiesLinkingParamProperties {
    "model-version"?: string;
    showStats?: boolean;
    stringIndexType?: StringIndexType;
}
export declare type EntitiesLinkingParameters = RequestParameters & {
    queryParameters?: EntitiesLinkingParamProperties;
    body: MultiLanguageBatchInput;
};
interface KeyPhrasesParamProperties {
    "model-version"?: string;
    showStats?: boolean;
}
export declare type KeyPhrasesParameters = RequestParameters & {
    queryParameters?: KeyPhrasesParamProperties;
    body: MultiLanguageBatchInput;
};
interface LanguagesParamProperties {
    "model-version"?: string;
    showStats?: boolean;
}
export declare type LanguagesParameters = RequestParameters & {
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
export {};
//# sourceMappingURL=parameters.d.ts.map