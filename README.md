# Azure Cognitive Search - Generate Embeddings

**DISCLAIMER: This app is not for production use and is strictly a sample for how customers can generate embeddings using OpenAI models as inputs for machine learning models or search applications**

This repository is built with code samples in Python, Javascript, and the OpenAI API to generate query and document embeddings. The embeddings are created using the OpenAI `text-embedding-ada-002`, and the resulting embeddings are saved in a JSON file for each input data. The goal of this project is to provide a simple and efficient method for generating embeddings, which can be used for a variety of natural language processing tasks, such as semantic search, clustering, and classification.

## Features

- Generate embeddings from your documents after they have been pre-processed and enriched
- One click export for docVectors and queryVectors

## Getting Started

### Prerequisites

- Azure OpenAI or OpenAI service
- Text data in JSON format
- For javascript sample, you will need Node (I'm using version 16.x)
- For Python sample, you will need Python (I'm using a jupyter notebook version 3.9)

Once you've met all the pre-requisites, you'll need to follow these steps:

1. Clone this repository to your local machine using `git clone https://github.com/farzad528/embeddings-generator.git`
2. Change into the newly created directory using `cd [your directory here]`
3. For javascript, install the required dependencies by running `npm install` or `yarn install`;

   3.1 For javascript, simply run the nodejs file by using the `node name-of-file.js` command

   3.2 For python, simply run the jupyter notebook or by using the `python name-of-file.ipynb` command

4. Configure variables
   4.1 Create a .env file in the folder root with the following info:

   ```
    OPENAI_SERVICE_NAME=your-azure-openai-service-name
    DEPLOYMENT_NAME=text-embedding-ada-002
    OPENAI_API_VERSION=2022-12-01
    OPENAI_API_KEY=your-api-key
   ```
5. Once you generate the embeddings, navigate to the `output` folder and you will see the queryVector and docVector json files that you can use for vector retrieval

## Conclusion

I hope you find this repository useful for generating embeddings for your search application. If you have any questions or suggestions, please feel free to open an issue and I'll be happy to help.

## Contributing

If you'd like to contribute to this repository, please feel free to do so! There are many ways to contribute, such as fixing bugs, improving the documentation, or adding new features. To get started, simply fork this repository and make your changes. When you're ready, submit a pull request and I'll take a look.

## Learn More

To learn more about OpenAI, take a look at the following resources:

- [Embeddings](https://platform.openai.com/docs/guides/embeddings) - learn about Embeddings.
- [Azure OpenAI](https://learn.microsoft.com/azure/cognitive-services/openai/) - read the official Azure OpenAI documentation
- [Azure Cognitive Search](https://learn.microsoft.com/azure/search/) - read the official Azure Cogntiive Search documentation
