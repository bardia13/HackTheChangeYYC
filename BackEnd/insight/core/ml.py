import requests
from google.cloud import language_v1
import json
import requests
from urllib.parse import urlencode

def break_transcripts_into_section(transcripts):
    start_time = 0
    end_time = 0
    counter = 0
    text = ""
    result = []

    for item in transcripts:
        if counter == 0:
            start_time = item["start"]
        pieces = item["text"].split()
        text += " ".join(pieces) + " "
        counter += len(pieces)
        if counter > 800:
            end_time = item["start"] + item["duration"]
            result.append({
                "start": start_time,
                "end": end_time,
                "text": text
            })
            start_time = 0
            end_time = 0
            text = ""
            counter = 0
    end_time = transcripts[-1]["start"] + transcripts[-1]["duration"]
    if counter > 0:
        result.append({
            "start": start_time,
            "end": end_time,
            "text": text
        })


    return result


def get_summary_of_transcript(transcripts):
    API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
    headers = {"Authorization": "Bearer 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"}
    sections = break_transcripts_into_section(transcripts)
    print(sections)

    def query(payload):
        response = requests.post(API_URL, headers=headers, json=payload)
        return response.json()

    for section in sections:
        output = query({
            "inputs": section["text"],
        })
        section["text"] = output[0]["summary_text"]
    return sections


def get_text_keywords(text):
    language_client = language_v1.LanguageServiceClient()
    document = language_v1.types.Document(content=text.strip(), language='en', type_=language_v1.Document.Type.PLAIN_TEXT)
    response = language_client.analyze_entities(document=document, encoding_type='UTF32')
    keywords_array = []
    for entity in response.entities:
        if (entity.salience > 0.01 and language_v1.Entity.Type.OTHER != entity.type_) or \
                (entity.salience > 0.1 and language_v1.Entity.Type.OTHER == entity.type_):
            keywords_array.append(entity.name)
    return list(set(keywords_array))


def get_google_knowledge_results(keyword):
    api_key = "AIzaSyDtXV1y58ZnwDmQaf9QHWLvOEUGq0m1iVk"
    service_url = 'https://kgsearch.googleapis.com/v1/entities:search'
    params = {
        'query': keyword,
        'limit': 1,
        'indent': True,
        'key': api_key,
    }
    url = service_url + '?' + urlencode(params)
    response = requests.get(url).json()
    try:
        return response["itemListElement"][0]["result"]
    except KeyError:
        return None
