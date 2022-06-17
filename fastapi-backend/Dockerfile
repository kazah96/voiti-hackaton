FROM python:3 as build
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /project
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
