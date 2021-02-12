import TextAnalytics from "./src";
import { DefaultAzureCredential } from "@azure/identity";
import { config } from "dotenv";
import {
  Languages200Response,
  Languages500Response,
  PipelineResponse,
} from "./src/responses";

config();

async function requestSample() {
  console.log("=== Start requestSample ===");
  const client = TextAnalytics(
    new DefaultAzureCredential(),
    "https://joheredi-ta.cognitiveservices.azure.com"
  );

  const documents = [
    { id: "First", text: "This is a test text" },
    { id: "Second", text: "Este es un texto de prueba" },
    { id: "third", text: "asdfasdf asdfasdfasdfer" },
  ];

  const languagesResult = await client.request("POST /languages", {
    body: { documents },
  });

  if (languagesResult.status === 200) {
    for (const result of languagesResult.body.documents) {
      console.log(
        `Sentence with Id: '${result.id}' detected language: ${
          result.detectedLanguage.name
        } with ${result.detectedLanguage.confidenceScore * 100}% confidence`
      );
    }
  } else {
    throw languagesResult.body.error;
  }
}

async function requestUncheckedSample() {
  console.log("=== Start requestUncheckedSample ===");
  const client = TextAnalytics(
    new DefaultAzureCredential(),
    "https://joheredi-ta.cognitiveservices.azure.com"
  );

  const documents = [
    { id: "First", text: "This is a test text" },
    { id: "Second", text: "Este es un texto de prueba" },
    { id: "third", text: "asdfasdf asdfasdfasdfer" },
  ];

  const languagesResult = await client.requestUnchecked("POST /languages", {
    body: { documents },
  });

  if (isSuccessResponse(languagesResult)) {
    for (const result of languagesResult.body.documents) {
      console.log(
        `Sentence with Id: '${result.id}' detected language: ${
          result.detectedLanguage.name
        } with ${result.detectedLanguage.confidenceScore * 100}% confidence`
      );
    }
  } else if (isErrorResponse(languagesResult)) {
    throw languagesResult.body.error;
  }

  function isSuccessResponse(
    result: PipelineResponse
  ): result is Languages200Response {
    return result.status === 200;
  }

  function isErrorResponse(
    result: PipelineResponse
  ): result is Languages500Response {
    return result.status !== 200;
  }
}

async function main() {
  await requestUncheckedSample();
  await requestSample();
}

main().catch(console.error);
