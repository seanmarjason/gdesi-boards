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

            If you have not received any data in RESPONSES, 
            ask a further 2 questions to clarify your understanding. 
            Wait for a response to each of these questions.

            If you receive RESPONSES from the user, assume 
            that you have already clarified the users initial message and
            do not ask any further questions. Instead, respond with the 
            original message but rewritten to add your new understanding 
            using the RESPONSES from the user. This message should be
            written in a way that it appears as though the user has written it
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