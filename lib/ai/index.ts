import { createOpenAI } from "@ai-sdk/openai";
import { createXai } from "@ai-sdk/xai";
import { experimental_wrapLanguageModel as wrapLanguageModel } from "ai";

import { customMiddleware } from "./custom-middleware";
import { models } from "./models";

// Create configured instances
const openai = createOpenAI({
  compatibility: "strict",
  fetch: async (url, init) => {
    try {
      const response = await fetch(url, init);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "OpenAI API Error");
      }
      return response;
    } catch (error) {
      console.error("OpenAI API Error:", error);
      throw error;
    }
  },
});

const xai = createXai({
  fetch: async (url, init) => {
    try {
      const response = await fetch(url, init);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "xAI API Error");
      }
      return response;
    } catch (error) {
      console.error("xAI API Error:", error);
      throw error;
    }
  },
});

export const customModel = (apiIdentifier: string) => {
  const model = models.find((m) => m.apiIdentifier === apiIdentifier);

  if (!model) {
    throw new Error(`Unknown model: ${apiIdentifier}`);
  }

  // Select provider based on model configuration
  const provider = model.provider === "xai" ? xai : openai;

  return wrapLanguageModel({
    model: provider(apiIdentifier as any),
    middleware: customMiddleware,
  });
};
