FROM python:3.8
WORKDIR /app

RUN rm -rf /var/liv/apt/list/* && apt-get update && apt-get -y install libgl1-mesa-glx
COPY . /app
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["gunicorn", "app:app", "-w","4","--bind","0.0.0.0:5000"]