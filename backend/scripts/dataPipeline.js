require("dotenv").config();
const axios = require("axios");
const { OpenAI } = require("openai");

// Initialize OpenAI client with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Make the API call to OpenAI  for classification
const prepareClassificationPrompt = (newsArticle) => {
  return (
    `Classify the following news article as either 'local' or 'global':\n\n` +
    `Article: ${newsArticle.headline}\nCity: ${newsArticle.city}\n\n` +
    `Please classify this news article as either 'local' or 'global'.`
  );
};

const classifyWithOpenAI = async (newsArticle) => {
  const prompt = prepareClassificationPrompt(newsArticle);

  try {
    // Make the API call to OpenAI for classification
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that classifies news articles as either 'local' or 'global'.",
        },
        {
          role: "user",
          content: prompt, // Use the dynamically generated prompt
        },
      ],
      max_tokens: 100, // Adjust the number of tokens as needed
    });

    // Extract the classification result from OpenAI response
    const openAIResponse = response.choices[0].message.content
      .trim()
      .toLowerCase();
    const isGlobal = openAIResponse === "global"; // Based on OpenAI's response
    return { isGlobal, location: newsArticle.city };
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw new Error("Error calling OpenAI for classification.");
  }
};

module.exports = {
  prepareClassificationPrompt,
  classifyWithOpenAI,
};
