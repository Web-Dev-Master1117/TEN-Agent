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

main().catch(console.error);
