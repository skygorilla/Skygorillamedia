import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

let ai: any;

try {
  ai = genkit({
    plugins: [googleAI()],
    model: 'googleai/gemini-2.5-flash',
  });
} catch (error) {
  console.error('AI initialization failed:', error);
  throw error;
}

export { ai };
