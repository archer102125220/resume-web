import { openai } from '@/utils/third-party/open-ai';

export async function test() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: 'You are a helpful assistant.' }],
    model: 'gpt-3.5-turbo'
    // model: 'gpt-4-vision-preview'
  });

  console.log(completion);
  console.log(completion.choices[0]);

  return completion;
}
