const { OpenAI } = require('openai');

export const evaluateMessage = async (userMessage) => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    console.log('userMessage:', userMessage);

    console.log('Asking ChatGPT ...');

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `
            You are an office worker who regularly communicates 
            with their team to collaborate on tasks. You need 
            very detailed instructions or feedback whenever you 
            are working on a task, and so you ask questions whenever 
            someone sends you feedback or comments on your work to 
            make sure you clearly understand what they are saying. 

            If you receive a very simple message or a message that 
            is unclear, ask a further 2 questions to clarify your understanding. 

            If you receive a very detailed message, respond with 'Understood'.
          `,
        },
        {
          role: 'user',
          content: userMessage,
        },
      ],
      temperature: 0.9,
      max_tokens: 150,
    });

    console.log('Parsing response ...');

    const apiMessageStr = response.choices[0].message.content;

    console.log('Returning response ...');

    return {
      statusCode: 200,
      body: JSON.stringify({ message: apiMessageStr }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error processing request' }),
    };
  }
};