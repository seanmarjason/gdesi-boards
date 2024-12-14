import os
import urllib3
import json
import re
from openai import OpenAI

def lambda_handler(event, context):

    secret_id = "OPENAI_API_KEY"
    secret_name = "OPENAI_API_KEY"
    auth_headers = {"X-Aws-Parameters-Secrets-Token": os.environ.get('AWS_SESSION_TOKEN')}

    http = urllib3.PoolManager()
    r = http.request("GET", "http://localhost:2773/secretsmanager/get?secretId=" + secret_id, headers=auth_headers)

    parameter = json.loads(r.data)
    OPENAI_API_KEY = json.loads(parameter["SecretString"])[secret_name]

    client = OpenAI(api_key=OPENAI_API_KEY)

    response = client.chat.completions.with_raw_response.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": "Get a random motivational quote"
            }
        ],
        temperature=0.9,
        max_completion_tokens=150
    )

    api_return_dict = json.loads(response.text)
    api_message_str = api_return_dict.get('choices')[0].get('message').get('content')

    return api_message_str
