// Define your models here.

export interface Model {
  id: string;
  label: string;
  apiIdentifier: string;
  description: string;
  provider?: "openai" | "xai";
}

export const models: Array<Model> = [
  {
    id: "gpt-4o-mini",
    label: "GPT 4o mini",
    apiIdentifier: "gpt-4o-mini",
    description: "Small model for fast, lightweight tasks",
    provider: "openai",
  },
  {
    id: "gpt-4o",
    label: "GPT 4o",
    apiIdentifier: "gpt-4o",
    description: "For complex, multi-step tasks",
    provider: "openai",
  },
  {
    id: "o1",
    label: "o1",
    apiIdentifier: "o1",
    description: "Advanced reasoning for complex tasks",
    provider: "openai",
  },
  {
    id: "grok-2",
    label: "Grok 2",
    apiIdentifier: "grok-2-1212",
    description: "xAI's latest model for general tasks",
    provider: "xai",
  },
] as const;

export const DEFAULT_MODEL_NAME: string = "gpt-4o-mini";
