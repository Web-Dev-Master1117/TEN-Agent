import {
  KnownJsonResponseTypes,
  RedirectStatuses,
  SuccessStatuses,
} from "./typeConstants";
import { BasicResponse } from "./types";

/**
 * Extracts the response type from an operation definition
 */
export declare type ExtractResponse<R> = "responses" extends keyof R
  ? SuccessResponseDataType<R["responses"]> extends never
    ? RedirectResponseDataType<R["responses"]> extends never
      ? never
      : RedirectResponseDataType<R["responses"]>
    : SuccessResponseDataType<R["responses"]>
  : unknown;

/**
 * Gets the data type for the success response
 */
export declare type SuccessResponseDataType<Responses> = {
  [K in SuccessStatuses & keyof Responses]: GetContentKeyIfPresent<
    Responses[K]
  > extends never
    ? never
    : BasicResponse<GetContentKeyIfPresent<Responses[K]>, K>;
}[SuccessStatuses & keyof Responses];

declare type DataType<T> = {
  [K in KnownJsonResponseTypes & keyof T]: T[K];
}[KnownJsonResponseTypes & keyof T];

/**
 * Extracts the "content" property from an object T.
 */
declare type GetContentKeyIfPresent<T> = "content" extends keyof T
  ? DataType<T["content"]>
  : DataType<T> extends never
  ? any
  : DataType<T>;

//   202: {
//         headers: { "Operation-Location"?: string };
//       };

declare type RedirectResponseDataType<Responses> = {
  [K in RedirectStatuses & keyof Responses]: BasicResponse<unknown, K>;
}[RedirectStatuses & keyof Responses];

export declare type ToParameters<T> = ExtractParameters<T> &
  ExtractRequestBody<T>;

declare type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

declare type ExtractParameters<T> = "parameters" extends keyof T
  ? UnionToIntersection<
      {
        [K in keyof T["parameters"]]: T["parameters"][K];
      }[keyof T["parameters"]]
    >
  : {};

declare type ExtractRequestBody<T> = "requestBody" extends keyof T
  ? "content" extends keyof T["requestBody"]
    ? "application/json" extends keyof T["requestBody"]["content"]
      ? T["requestBody"]["content"]["application/json"]
      : {
          data: {
            [K in keyof T["requestBody"]["content"]]: T["requestBody"]["content"][K];
          }[keyof T["requestBody"]["content"]];
        }
    : "application/json" extends keyof T["requestBody"]
    ? T["requestBody"]["application/json"]
    : {
        data: {
          [K in keyof T["requestBody"]]: T["requestBody"][K];
        }[keyof T["requestBody"]];
      }
  : {};
