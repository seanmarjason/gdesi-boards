const AWS = require('aws-sdk');
const axios = require('axios');
const { OpenAI } = require('openai');

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  console.log('Getting API Key ...');

  const secretId = 'OPENAI_API_KEY';
  const secretName = 'OPENAI_API_KEY';
  const authHeaders = {
    'X-Aws-Parameters-Secrets-Token': process.env.AWS_SESSION_TOKEN,
  };

  try {
    // Get secret value from AWS Secrets Manager
    const secretResponse = await axios.get(
      `http://localhost:2773/secretsmanager/get?secretId=${secretId}`,
      { headers: authHeaders }
    );

    const secretString = JSON.parse(secretResponse.data.SecretString);
    const OPENAI_API_KEY = secretString[secretName];

    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });

    const userMessage = body.userMessage;
    console.log('userMessage:', userMessage);

    const userResponses = body.responses || '';
    console.log('userResponses:', userResponses);

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
        {
          role: 'user',
          content: 'RESPONSES:' + ' ' + userResponses.join(' '),
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