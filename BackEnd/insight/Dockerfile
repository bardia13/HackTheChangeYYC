FROM python:3.9.12

WORKDIR /usr/opt/insight
RUN apt-get update
RUN apt-get install -y libpq-dev
RUN apt-get install -y gcc
RUN apt-get install -y python3-dev
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY . .