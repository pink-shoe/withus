FROM python:3.8.1
WORKDIR /usr/src/app

RUN rm -rf /var/liv/apt/list * && apt-get update && apt-get install python3
COPY . .
RUN pip install --upgrade pip
RUN pip install -r ./requirements.txt

# EXPOSE 5000

CMD ["gunicorn","-w","4","--bind","0.0.0.0:5000","app"]