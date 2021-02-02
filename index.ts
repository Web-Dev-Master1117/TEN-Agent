import { createTextAnalyticsClient } from "./src/textAnalyticsClient";
import { DefaultAzureCredential } from "@azure/identity";

async function main() {
  const client = createTextAnalyticsClient(
    new DefaultAzureCredential(),
    "https://localhost:3000"
  );

  const documents = [
    { id: "First", text: "This is a test text" },
    { id: "Second", text: "Este es un texto de prueba" },
    { id: "third", text: "asdfasdf asdfasdfasdfer" },
  ];

  const languagesResult = await client.request("POST /languages", {
    documents,
  });

  console.log(
    languagesResult.data.documents.map((d) => console.log(d.detectedLanguage))
  );
}
