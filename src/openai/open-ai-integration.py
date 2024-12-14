import os
import urllib3
import json
import re
from openai import OpenAI

def lambda_handler(event, context):
    body = json.loads(event['body'])
    print("Getting API Key ...")

    secret_id = "OPENAI_API_KEY"
    secret_name = "OPENAI_API_KEY"
    auth_headers = {"X-Aws-Parameters-Secrets-Token": os.environ.get('AWS_SESSION_TOKEN')}

    http = urllib3.PoolManager()
    r = http.request("GET", "http://localhost:2773/secretsmanager/get?secretId=" + secret_id, headers=auth_headers)

    parameter = json.loads(r.data)
    OPENAI_API_KEY = json.loads(parameter["SecretString"])[secret_name]

    client = OpenAI(api_key=OPENAI_API_KEY)

    # userMessage = body['userMessage']
    userMessage = body.get('userMessage')
    print("userMessage:", userMessage)

    userResponses = body.get('responses', "")
    print("userResponses:", userResponses)

    print("Asking ChatGPT ...")

    response = client.chat.completions.with_raw_response.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": 
                """"
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
                """
            },
            {
                "role": "user",
                "content": userMessage
            },
            {
                "role": "user",
                "content": "RESPONSES:" + " ".join(userResponses)
            }
        ],
        temperature=0.9,
        max_completion_tokens=150
    )

    print("Parsing response ...")

    api_return_dict = json.loads(response.text)

    print("RESPONSE:", api_return_dict)

    api_message_str = api_return_dict.get('choices')[0].get('message').get('content')

    print("Returning response ...")

    return {"body": api_message_str}
