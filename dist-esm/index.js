import { __awaiter } from "tslib";
import { createPipelineRequest, createHttpHeaders, } from "@azure/core-https";
import { createDefaultPipeline, getCachedDefaultHttpsClient, } from "./clientHelpers";
function createTextAnalyticsClient(credentials, Endpoint, options) {
    const baseUrl = "{Endpoint}/text/analytics/v3.1-preview.3".replace(/{Endpoint}/g, Endpoint);
    const pipeline = createDefaultPipeline(credentials, options);
    pipeline.removePolicy({ name: "exponentialRetryPolicy" });
    const client = {
        request: (route, ...args) => __awaiter(this, void 0, void 0, function* () {
            const argumentsDetails = extractArguments(args);
            const result = yield sendRequest(baseUrl, pipeline, route, argumentsDetails);
            return result;
        }),
        requestUnchecked: (route, ...args) => __awaiter(this, void 0, void 0, function* () {
            const argumentsDetails = extractArguments(args);
            const result = yield sendRequest(baseUrl, pipeline, route, argumentsDetails);
            return result;
        }),
    };
    return client;
}
function sendRequest(baseUrl, pipeline, route, argumentsDetails) {
    return __awaiter(this, void 0, void 0, function* () {
        const httpClient = getCachedDefaultHttpsClient();
        const routeDetails = extractRouteDetails(route);
        const url = buildRequestUrl(baseUrl, routeDetails.path, argumentsDetails.pathParameters, argumentsDetails.options);
        const headers = createHttpHeaders(Object.assign({ accept: "application/json", "content-type": "application/json" }, (argumentsDetails.options.headers
            ? argumentsDetails.options.headers.toJSON()
            : {})));
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
        const result = yield pipeline.sendRequest(httpClient, request);
        return {
            request,
            headers: result.headers,
            status: result.status,
            body: JSON.parse(result.bodyAsText || "{}"),
        };
    });
}
function extractArguments(...args) {
    let options = {};
    let pathParameters = [];
    for (const arg of args) {
        if (Array.isArray(arg)) {
            for (const item of arg) {
                if (typeof item === "string") {
                    pathParameters.push(item);
                }
                else {
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
function extractRouteDetails(route) {
    if (!route) {
        throw new Error(`route cannot be undefined or empty`);
    }
    const parts = route.split(" ");
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
        throw new Error(`Unexpected route format for ${route}\n The expected format is "<VERB> <PATH>" i.e "POST /foo" `);
    }
    const [method, path] = parts;
    if (!supportedMethods.includes(method.toUpperCase())) {
        throw new Error(`Unexpected method: ${method}\n Supported methods: ${JSON.stringify(supportedMethods)} `);
    }
    return {
        method: method,
        path,
    };
}
function buildRequestUrl(baseUrl, routePath, pathParameters, options = {}) {
    let path = routePath;
    for (const pathParam of pathParameters) {
        path = path.replace(/{.*?}/, pathParam);
    }
    const url = new URL(`${baseUrl}/${path}`);
    if (options.queryParameters) {
        const queryParams = options.queryParameters;
        queryParams["model-version"];
        for (const key of Object.keys(queryParams)) {
            url.searchParams.append(key, queryParams[key]);
        }
    }
    return url.toString();
}
export default createTextAnalyticsClient;
export * from "./models";
export * from "./parameters";
export * from "./responses";
//# sourceMappingURL=index.js.map