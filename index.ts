import TextAnalytics from "./src";
import { DefaultAzureCredential } from "@azure/identity";
import { config } from "dotenv";

config();

async function main() {
  const client = TextAnalytics(
    new DefaultAzureCredential(),
    "https://joheredi-ta.cognitiveservices.azure.com"
  );

  const documents = [
    { id: "First", text: "This is a test text" },
    { id: "Second", text: "Este es un texto de prueba" },
    { id: "third", text: "asdfasdf asdfasdfasdfer" },
  ];

  const languagesResult = await client.request("POST /sentiment", {
    documents,
  });

  if (languagesResult.status === 200) {
    for (const result of languagesResult.parsedBody.documents) {
      console.log(
        `Sentence with Id: '${result.id}' detected sentiment: ${
          result.sentiment
        } with ${result.confidenceScores[result.sentiment] * 100}% confidence`
      );
    }
  } else {
    console.error(languagesResult.parsedBody.error.message);
  }
}

main().catch(console.error);
