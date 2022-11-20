# -------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See License.txt in the project root for
# license information.
# --------------------------------------------------------------------------

"""
FILE: sample_extract_key_phrases.py

DESCRIPTION:
    This sample demonstrates how to extract key talking points from a batch of documents.

    In this sample, we want to go over articles and read the ones that mention Microsoft.
    We're going to use the SDK to create a rudimentary search algorithm to find these articles.

USAGE:
    python sample_extract_key_phrases.py

    Set the environment variables with your own values before running the sample:
    1) AZURE_LANGUAGE_ENDPOINT - the endpoint to your Language resource.
    2) AZURE_LANGUAGE_KEY - your Language subscription key
"""

import os


def sample_extract_key_phrases() -> None:
    print(
        "In this sample, we want to find the articles that mention Microsoft to read."
    )
    articles_that_mention_microsoft = []
    # [START extract_key_phrases]
    from azure.core.credentials import AzureKeyCredential
    from azure.ai.textanalytics import TextAnalyticsClient

    endpoint = "https://bardia-abhari-hyyc.cognitiveservices.azure.com/"
    key = ""

    text_analytics_client = TextAnalyticsClient(endpoint=endpoint, credential=AzureKeyCredential(key))
    articles = [
        """
        close to the curve after the curb open up to the outside and get smoothly flat to the right side of the fence ahead of you aim for the photographer and brakes and going straight onto the carousel stay on a concrete bit at the exit the right corner of the plate should be in the middle of the car and right curve very good two fast cars behind stay right eyes on the road track goes right let them pass keep coming through next to you very good the second one breaks a bit let go left curve left curve gas and right curve at the right curve breaks end of the curve turn into the left curve so breaking let go turning in left curve Stone to the right curb Stone and to the left side and stay left of the white sign 151 and on the brakes let go right curbstone go and guess and overtake the car while you're doing like this perfect you see left curved Stone very good caution breaks swiftly we're staying on the outside because of him caution breaks tight left on the curb go on the curb all good go right curve pull on the curve full on very good left fence fence break stay left brakes let go right curb Stone gas to the outside back right side middle brakes more let go left curb left curve ignore the car behind for now staying left staying left brake stay left let go right curb and here stay right left and pass okay once he goes through you move over to the left brakes to the left a bit let go right curve very good guess to the outside flat and back to the right side staying right till the yellow graffiti on the tarmac and Brake stay right left curved Stone closer to the outside right grip you can go on it if you want to then to the fence on the right I had to be 169 and then left curb left curve speed is fine no braking left curves no left curve stone at the left curve just a bit actually after the jump we can break so don't break before the jump not all good break a bit enough right curb there are so many dodgy cambers and undulations around nearly every corner here that it is clearly vital to position your car properly on track and know when to break but especially know when not to break orange flag turning point to the right curb Stone right curb and gas speed is fine straight very good right curbstone to the left side middle of the truck very good very good very good break straight to the left side more breaking let go right curve staying right very good and it's yellow so slow down here yellow light is 100 kilometers per hour 60 miles per hour we just stay right a little tiny uh we probably stay left because they're doing something here on the right so slow down yeah it looks like they're actually done with their job hopefully mini Carousel yeah as you can see Misha is an unreal driving coach his incredibly calm clear instructions coupled with his simple hand gestures really settled my nerves and made sure I got the most out of this first lap stay right bloody hell and a big traffic jam again this place makes Silverstone seem Ponce like that is unbelievable thank you so much you're welcome I hope you enjoyed it completely crap I'm glad I had you there because having mirrors plus all those curves and corners and also traffic so I could tell you when something is coming up yes but what's was it more or less intimidating than you thought how was it for you it's actually it wasn't quite as intimidating but I think purely because you're here like if I was doing that by myself holy mother yeah and I'm I'm I've got PTSD from Cars overheating so I was constantly doubting you down yeah it is good we're all good but I have to constantly like check just my OCD as we go in there but wow some of those sections and it's funny the the what's the corner the jump and then the right uh flange Garden I was convinced watching all the videos that I was definitely gonna break before the jump but I'm glad you said yeah we were not going fast enough to break for the jump so because you already you break slightly before that so the speed was more than enough we could have even taken it at the speed without breaking but it's always be safe and sorry to settle the car cool so it was snow was 
        """,
        """
        Washington, D.C. Autumn in DC is a uniquely beautiful season. The leaves fall from the trees
        in a city chock-full of forests, leaving yellow leaves on the ground and a clearer view of the
        blue sky above...
        """,
        """
        Redmond, WA. In the past few days, Microsoft has decided to further postpone the start date of
        its United States workers, due to the pandemic that rages with no end in sight...
        """,
        """
        Redmond, WA. Employees at Microsoft can be excited about the new coffee shop that will open on campus
        once workers no longer have to work remotely...
        """
    ]

    result = text_analytics_client.extract_key_phrases(articles)
    for idx, doc in enumerate(result):
        if not doc.is_error:
            print("Key phrases in article #{}: {}".format(
                idx + 1,
                ", ".join(doc.key_phrases)
            ))
    # [END extract_key_phrases]
            if "Microsoft" in doc.key_phrases:
                articles_that_mention_microsoft.append(str(idx + 1))

    print(
        "The articles that mention Microsoft are articles number: {}. Those are the ones I'm interested in reading.".format(
            ", ".join(articles_that_mention_microsoft)
        )
    )


if __name__ == '__main__':
    sample_extract_key_phrases()