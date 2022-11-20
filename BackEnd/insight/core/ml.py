import requests

def splitter(n, s):
    pieces = s.split()
    return (" ".join(pieces[i:i+n]) for i in range(0, len(pieces), n))


def get_summary_of_text(text):        
    API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
    headers = {"Authorization": "Bearer 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"}
    chunks = list(splitter(800, text))
    
    print(len(chunks))
    
    def query(payload):
        response = requests.post(API_URL, headers=headers, json=payload)
        return response.json()

    final_result = ""
    for item in chunks:
        output = query({
            "inputs": item,
        })
        final_result += " +++ " + output[0]["summary_text"]
    return final_result
    # output = query({
    #     "inputs": text,
    # }) 
    # return output


