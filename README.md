# HackTheChangeYYC - Gilbert

## Inspiration

Although the internet has made learning materials more available, this alone is not enough to make education equal for everyone. Let’s assume that a student in a developing country does not have access to an algebra teacher. They can access a suitable Algebra course online. But what if they have questions regarding a part of the materials? Or maybe they want the important notes of the video to be pointed out? This is only one of the cases of inequality in education. That’s why we decided to focus our hack on developing a tool that helps online education be equal for different groups of people despite their geographical location or even their personal traits.

## What it does

Introducing Gilbert, an online learning assistant powered by Artificial Intelligence and Natural Language Processing for enriching user experience when viewing a course online. But how does it work? When a course video or material is given to Gilbert, it uses a state-of-the-art BART model, developed by Facebook and fine-tuned on CNN and Daily Mail articles, to extract multiple key points from the different sections of the video or text. These key points help students understand the material with easy access to earlier parts of the video in the form of the key points related to those parts. Furthermore, Gilbert uses Google Cloud’s NLP engine to extract the primary phrases from these key points. These phrases are highlighted and represent the new or important concepts laid out by the corresponding section of the video. To enhance the learning experience for the students, we leverage Google’s knowledge graph API to provide additional information for each key phrase. This way,  just with a click,  a short explanation is available for the primary phrases in the video to create a continuous and complete learning experience without having to jump between different resources.
Although artificial intelligence is a powerful tool to enhance the learning experience, one should not underestimate the positive effect of a community. That's why Gilbert also creates a community of learners for each video to share their notes or additional learning materials.

## How we built it

We used the huggingface and google NLP APIs for our natural language tasks such as summarization, keyword extraction, and knowledge graph query. Our next.js frontend talks to the backend using a REST API. we use Postgres for our SQL database and maintain a Redis cache layer.

## Challenges we ran into

All of us were backend developers so we have zero frontend development experience. We started from ground zero, but we were able to nicely communicate through the whole process and spin up quite a nice next.js frontend. We were limited by our NLP APIs, but after adding a cache layer and using the database efficiently, we could somehow overcome the problem.

## Accomplishments that we're proud of

We are proud that we could build an MVP in a team of 3, through effective communication and extensive development. We started without zero experience in some skills such as frontend development, but after trying we could come up with quite an acceptable solution to the frontend platform.

## What we learned

Although coding skill has a crucial role in building a solution for a particular problem, we found out that the most critical skill is team-play. We were able to grow together so much in this little time in our little team of 3. After that, we exercised rapid modeling of a full web solution consisting of a complete backend and frontend with an acceptable feature set.

## What's next for Gilbert

Online learning has proven a powerful tool to promote equality of education in all over the world, but it's not enough. More insight and useful data can be provided to both teachers and students using many techniques. Using AI we can add value to the already-created content. We decided to prove the field using AI, but the problem can be addressed in many ways. We can shape communities for courses that can help people grow.

## Prerequisites

* Docker
* Docker Compose

## Deployment

To run the project, enter `docker-compose up -d --build` in project directory. You can access the API server on `0.0.0.0:8000` and the client on `0.0.0.0:3000`
