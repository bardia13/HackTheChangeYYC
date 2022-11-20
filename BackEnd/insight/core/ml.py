import requests

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



