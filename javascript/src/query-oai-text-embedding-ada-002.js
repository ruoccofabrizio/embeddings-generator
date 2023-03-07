const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const apiUrl = `https://${process.env.OPENAI_SERVICE_NAME}.openai.azure.com`;
const apiKey = process.env.OPENAI_API_KEY;
const deploymentName = process.env.DEPLOYMENT_NAME;
const apiVersion = process.env.OPENAI_API_VERSION;

const requestData = {
  input: "футболист",
};

const fs = require("fs");
const outputFilePath = "output/queryVector.json";

axios
  .post(
    `${apiUrl}/openai/deployments/${deploymentName}/embeddings?api-version=${apiVersion}`,
    requestData,
    {
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
    }
  )
  .then((response) => {
    const queryVector = response.data.data[0].embedding;
    const jsonData = JSON.stringify(queryVector);
    fs.writeFile(outputFilePath, jsonData, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Query vector saved to ${outputFilePath}`);
      }
    });
  })
  .catch((error) => {
    console.error(error);
  });
