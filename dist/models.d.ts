export declare type AnalyzeBatchInput = AnalyzeBatchInputBase & JobDescriptor & JobManifest;
interface AnalyzeBatchInputBase {
    analysisInput: MultiLanguageBatchInput;
}
export interface MultiLanguageBatchInput {
    documents: TextDocumentInput[];
}
export interface TextDocumentInput {
    id: string;
    text: string;
    language?: string;
}
export interface JobDescriptor {
    displayName?: string;
}
export interface JobManifest {
    tasks: JobManifestTasks;
}
export interface JobManifestTasks {
    entityRecognitionTasks?: EntitiesTask[];
    entityRecognitionPiiTasks?: PiiTask[];
    keyPhraseExtractionTasks?: KeyPhrasesTask[];
}
export interface EntitiesTask {
    parameters?: EntitiesTaskParameters;
}
export interface EntitiesTaskParameters {
    modelVersion?: string;
    stringIndexType?: StringIndexTypeResponse;
}
export interface PiiTask {
    parameters?: PiiTaskParameters;
}
export interface PiiTaskParameters {
    domain?: PiiTaskParametersDomain;
    modelVersion?: string;
    stringIndexType?: StringIndexTypeResponse;
}
export interface KeyPhrasesTask {
    parameters?: KeyPhrasesTaskParameters;
}
export interface KeyPhrasesTaskParameters {
    modelVersion?: string;
}
export interface ErrorResponse {
    error: TextAnalyticsError;
}
export interface TextAnalyticsError {
    code: ErrorCodeValue;
    message: string;
    target?: string;
    innererror?: InnerError;
    details?: TextAnalyticsError[];
}
export interface InnerError {
    code: InnerErrorCodeValue;
    message: string;
    details?: InnerErrorDetails;
    target?: string;
    innererror?: InnerError;
}
export declare type AnalyzeJobState = AnalyzeJobStateBase & JobMetadata & TasksState & Pagination;
interface AnalyzeJobStateBase {
    errors?: TextAnalyticsError[];
    statistics?: TextDocumentBatchStatistics;
}
export interface TextDocumentBatchStatistics {
    documentCount: number;
    validDocumentCount: number;
    erroneousDocumentCount: number;
    transactionCount: number;
}
export interface JobMetadata {
    createdDateTime: Date;
    displayName?: string;
    expirationDateTime?: Date;
    jobId: string;
    lastUpdateDateTime: Date;
    status: State;
}
export interface TasksState {
    tasks: TasksStateTasks;
}
export interface TasksStateTasks {
    details?: TasksStateTasksDetails;
    completed: number;
    failed: number;
    inProgress: number;
    total: number;
    entityRecognitionTasks?: TasksStateTasksEntityRecognitionTasksItem[];
    entityRecognitionPiiTasks?: TasksStateTasksEntityRecognitionPiiTasksItem[];
    keyPhraseExtractionTasks?: TasksStateTasksKeyPhraseExtractionTasksItem[];
}
export declare type TasksStateTasksDetails = TasksStateTasksDetailsBase & TaskState;
interface TasksStateTasksDetailsBase {
}
export interface TaskState {
    lastUpdateDateTime: Date;
    name?: string;
    status: State;
}
export declare type TasksStateTasksEntityRecognitionTasksItem = TasksStateTasksEntityRecognitionTasksItemBase & TaskState & Components15Gvwi3SchemasTasksstatePropertiesTasksPropertiesEntityrecognitiontasksItemsAllof1;
interface TasksStateTasksEntityRecognitionTasksItemBase {
}
export interface Components15Gvwi3SchemasTasksstatePropertiesTasksPropertiesEntityrecognitiontasksItemsAllof1 {
    results: EntitiesResult;
}
export interface EntitiesResult {
    documents: DocumentEntities[];
    errors: DocumentError[];
    statistics?: TextDocumentBatchStatistics;
    modelVersion: string;
}
export interface DocumentEntities {
    id: string;
    entities: Entity[];
    warnings: TextAnalyticsWarning[];
    statistics?: TextDocumentStatistics;
}
export interface Entity {
    text: string;
    category: string;
    subCategory?: string;
    offset: number;
    confidenceScore: number;
}
export interface TextAnalyticsWarning {
    code: WarningCode;
    message: string;
}
export interface TextDocumentStatistics {
    characterCount: number;
    transactionCount: number;
}
export interface DocumentError {
    id: string;
    error: TextAnalyticsError;
}
export declare type TasksStateTasksEntityRecognitionPiiTasksItem = TasksStateTasksEntityRecognitionPiiTasksItemBase & TaskState & Components15X8E9LSchemasTasksstatePropertiesTasksPropertiesEntityrecognitionpiitasksItemsAllof1;
interface TasksStateTasksEntityRecognitionPiiTasksItemBase {
}
export interface Components15X8E9LSchemasTasksstatePropertiesTasksPropertiesEntityrecognitionpiitasksItemsAllof1 {
    results: PiiResult;
}
export interface PiiResult {
    documents: PiiDocumentEntities[];
    errors: DocumentError[];
    statistics?: TextDocumentBatchStatistics;
    modelVersion: string;
}
export interface PiiDocumentEntities {
    id: string;
    redactedText: string;
    entities: Entity[];
    warnings: TextAnalyticsWarning[];
    statistics?: TextDocumentStatistics;
}
export declare type TasksStateTasksKeyPhraseExtractionTasksItem = TasksStateTasksKeyPhraseExtractionTasksItemBase & TaskState & Components1D9IzucSchemasTasksstatePropertiesTasksPropertiesKeyphraseextractiontasksItemsAllof1;
interface TasksStateTasksKeyPhraseExtractionTasksItemBase {
}
export interface Components1D9IzucSchemasTasksstatePropertiesTasksPropertiesKeyphraseextractiontasksItemsAllof1 {
    results: KeyPhraseResult;
}
export interface KeyPhraseResult {
    documents: DocumentKeyPhrases[];
    errors: DocumentError[];
    statistics?: TextDocumentBatchStatistics;
    modelVersion: string;
}
export interface DocumentKeyPhrases {
    id: string;
    keyPhrases: string[];
    warnings: TextAnalyticsWarning[];
    statistics?: TextDocumentStatistics;
}
export interface Pagination {
    nextLink?: string;
}
export declare type HealthcareJobState = HealthcareJobStateBase & JobMetadata & Pagination;
interface HealthcareJobStateBase {
    results?: HealthcareResult;
    errors?: TextAnalyticsError[];
}
export interface HealthcareResult {
    documents: DocumentHealthcareEntities[];
    errors: DocumentError[];
    statistics?: TextDocumentBatchStatistics;
    modelVersion: string;
}
export interface DocumentHealthcareEntities {
    id: string;
    entities: HealthcareEntity[];
    relations: HealthcareRelation[];
    warnings: TextAnalyticsWarning[];
    statistics?: TextDocumentStatistics;
}
export declare type HealthcareEntity = HealthcareEntityBase & Entity;
interface HealthcareEntityBase {
    isNegated: boolean;
    links?: HealthcareEntityLink[];
}
export interface HealthcareEntityLink {
    dataSource: string;
    id: string;
}
export interface HealthcareRelation {
    relationType: string;
    bidirectional: boolean;
    source: string;
    target: string;
}
export interface EntityLinkingResult {
    documents: DocumentLinkedEntities[];
    errors: DocumentError[];
    statistics?: TextDocumentBatchStatistics;
    modelVersion: string;
}
export interface DocumentLinkedEntities {
    id: string;
    entities: LinkedEntity[];
    warnings: TextAnalyticsWarning[];
    statistics?: TextDocumentStatistics;
}
export interface LinkedEntity {
    name: string;
    matches: Match[];
    language: string;
    dataSourceEntityId?: string;
    url: string;
    dataSource: string;
    bingEntitySearchApiId?: string;
}
export interface Match {
    confidenceScore: number;
    text: string;
    offset: number;
}
export interface LanguageBatchInput {
    documents: DetectLanguageInput[];
}
export interface DetectLanguageInput {
    id: string;
    text: string;
    countryHint?: string;
}
export interface LanguageResult {
    documents: DocumentLanguage[];
    errors: DocumentError[];
    statistics?: TextDocumentBatchStatistics;
    modelVersion: string;
}
export interface DocumentLanguage {
    id: string;
    detectedLanguage: DetectedLanguage;
    warnings: TextAnalyticsWarning[];
    statistics?: TextDocumentStatistics;
}
export interface DetectedLanguage {
    name: string;
    iso6391Name: string;
    confidenceScore: number;
}
export interface SentimentResponse {
    documents: DocumentSentiment[];
    errors: DocumentError[];
    statistics?: TextDocumentBatchStatistics;
    modelVersion: string;
}
export interface DocumentSentiment {
    id: string;
    sentiment: DocumentSentimentLabel;
    statistics?: TextDocumentStatistics;
    confidenceScores: SentimentConfidenceScores;
    sentenceSentiments: SentenceSentiment[];
    warnings: TextAnalyticsWarning[];
}
export interface SentimentConfidenceScores {
    positive: number;
    neutral: number;
    negative: number;
}
export interface SentenceSentiment {
    text: string;
    sentiment: SentenceSentimentLabel;
    confidenceScores: SentimentConfidenceScores;
    offset: number;
    aspects?: SentenceAspect[];
    opinions?: SentenceOpinion[];
}
export interface SentenceAspect {
    sentiment: TokenSentimentValue;
    confidenceScores: AspectConfidenceScoreLabel;
    offset: number;
    text: string;
    relations: AspectRelation[];
}
export interface AspectConfidenceScoreLabel {
    positive: number;
    negative: number;
}
export interface AspectRelation {
    relationType: AspectRelationType;
    ref: string;
}
export interface SentenceOpinion {
    sentiment: TokenSentimentValue;
    confidenceScores: AspectConfidenceScoreLabel;
    offset: number;
    text: string;
    isNegated: boolean;
}
export declare type PiiTaskParametersDomain = string;
export declare type InnerErrorCodeValue = string;
export declare type WarningCode = string;
export declare type StringIndexType = string;
export declare type StringIndexTypeResponse = "TextElements_v8" | "UnicodeCodePoint" | "Utf16CodeUnit";
export declare type ErrorCodeValue = "InvalidRequest" | "InvalidArgument" | "InternalServerError" | "ServiceUnavailable" | "NotFound";
export declare type State = "notStarted" | "running" | "succeeded" | "failed" | "rejected" | "cancelled" | "cancelling" | "partiallyCompleted" | "partiallySucceeded";
export declare type DocumentSentimentLabel = "positive" | "neutral" | "negative" | "mixed";
export declare type SentenceSentimentLabel = "positive" | "neutral" | "negative";
export declare type TokenSentimentValue = "positive" | "mixed" | "negative";
export declare type AspectRelationType = "opinion" | "aspect";
export declare type InnerErrorDetails = {
    [key: string]: string;
};
export {};
