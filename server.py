from flask import Flask, request,  jsonify
import os
import requests
app = Flask(__name__)

url = "https://us-central1-aiplatform.googleapis.com/v1/projects/elegant-beach-411622/locations/us-central1/publishers/google/models/gemini-pro:streamGenerateContent?alt=sse"

token = "ya29.c.c0AY_VpZhV4r8nchQQMMiGiS4rbWhb2bikQGjXZyxQPy3VxYOEOct-s9-uqL89D_uRKqrU071DA_xeyFzENi8Qr4mgQvKGWK9RaGKKXFNaAbSFfc3rwWps5SuXHQO5Stjv3LPx_8prqSNw36pVlvCp0zkd-Mrc-CuNyikKth3jy12xnTu4LcqmLCdlmLiiZp6e0Z6q6cdDmR1M3g3bCtiVwVpq9tev1AeNwWDhGcJ66Ox7sLMo0DyVbkd3CmltPuOcPolSjFSMPUpGUS2uLFbuzK_2dHfHuYmySk0b1AwSxHD0Dq3mwrHAJ_FbDZDVm3OnCnRuxcMkWwjAL7n0PmC1x8w8pIi-J5o7kncYJ7sjpnx-YaGAioXbfF0AwJNbh0T9ALnw610T400CQz6cWkb1o6xxiRj4xd8JURsZZUYwfOdyIjFZdQb3UjR3IaBSycR45Uu9J99thgBua3sO6pxehntswgbo8FJ2MO_hs5W3zyuX-brmt1qR2jc9RnFdhy9Melrj21I6jI5ir0IqSdul_b8QZIhm31lUdXoZMb4W2207xVRyOu2Sfk2ycpwR14ROgtJe8t-kr5h6apBQm4Mq7QfUqp3nhxmd8J7sdrB8ybYmYuJ0SzznFjRxqIqW1YaitqcJn08aqlx2a_Ul9aejtfd7V6-JRJ3sFz0eOZkrYhzrWmMFUWicV9pxXUuXZQX223h3eqBrt-OMaSpfQYxwlnc-S5gkvtFj1t1V1zVgQdbak06Qyqgqor2e4t2hqV2YoIS4jkeB5f436y1lYdq15B3JBv2WuZ_6b-dr-8iaJtjrk4VBfcJIeuq2B5O5uafzym9X2d8fVgdqoR-YzzFjMOIeUblcwSi3h0qBI31ujQa5cwfidqhvFb_axvloxQkRFZJbqF5BvBWSoUjl1uvcSY3xp5p8li3MB_ix7Uf1xvBe-rxBBvUJxuOSptMvJQWimVM5304Zp8jRnXSre67rv_l-uIIgyMdOF_bYIiSjf_4nSYozh26_r7n"

headers = {
            "Authorization": "Bearer {}".format(token),
            "Content-Type": "application/json; charset=utf-8"
        }

json_data = {
    "contents": {
        "role": "user",
        "parts": {
            "text": "Give me a recipe for banana bread."
        }
    },
    "safety_settings": {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_LOW_AND_ABOVE"
    },
    "generation_config": {
        "temperature": 0.2,
        "topP": 0.8,
        "topK": 40
    }
}

@app.route('/health-checks', methods=['POST'])
def get_health_checks():
    data = request.get_json()
    prompt = data["prompt"]
    # json_data["contents"]["parts"]["text"] = prompt
    response = requests.post(url, data=json_data, headers=headers)
    print(response.json())
    health_checks = ["Check 1", "Check 2", "Check 3"]
    return jsonify({"health_checks": health_checks})


if __name__ == "__main__":
    host = os.getenv("API_HOST", "0.0.0.0")
    port = os.getenv("API_PORT", "5000")
    app.run(host=host, port=port, debug=True)
