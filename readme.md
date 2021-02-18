## Text Analytics Low Level Client

### Install
```bash
npm install --save https://github.com/joheredi/ta-lowlevel-prototype
npm install --save @azure/identity
```

### Initialize a client

```typescript
import TextAnalytics from "@azure/textanalytics-lowlevel";
import { DefaultAzureCredential } from "@azure/identity";

const endpoint = "https://<accountName>.cognitiveservices.azure.com"

const client = TextAnalytics(
    new DefaultAzureCredential(),
    endpoint
  );

```

### Call an endpoint

```typescript
import TextAnalytics from "@azure/textanalytics-lowlevel";
import { DefaultAzureCredential } from "@azure/identity";

const endpoint = "https://<accountName>.cognitiveservices.azure.com"

async function analyzeLanguage() {
const client = TextAnalytics(
    new DefaultAzureCredential(),
    endpoint
  );

  const languagesResult = await client.request("POST /languages", {
    body: { documents: [{ id: "1", text: "This is a test text" }] },
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

analyzeLanguage().catch(console.error)

```

### Call an arbitrary endpoint with requestUnchecked


```typescript
import TextAnalytics from "@azure/textanalytics-lowlevel";
import { DefaultAzureCredential } from "@azure/identity";

const endpoint = "https://<accountName>.cognitiveservices.azure.com"

async function analyzeLanguage() {
const client = TextAnalytics(
    new DefaultAzureCredential(),
    endpoint
  );

  const languagesResult = await client.requestUnchecked("POST /languages", {
    body: { documents: [{ id: "1", text: "This is a test text" }] },
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

analyzeLanguage().catch(console.error)

```