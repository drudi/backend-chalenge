FROM python:3.5
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN pip install -r requirements.txt

RUN git clone https://github.com/drudi/django-cors-headers.git \
    && cd django-cors-headers \
    && python setup.py install


ADD . /code/

CMD ["gunicorn", "-b", "0.0.0.0:8000", "-w", "5", "-k", "gevent", "--log-file", "-", "--log-level", "debug", "--access-logfile", "-", "vehiclemanager.wsgi"]
