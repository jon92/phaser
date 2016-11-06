FROM debian:jessie
MAINTAINER jonathandouet@hotmail.fr

RUN apt-get update && \
    apt-get -yq install supervisor

COPY ./docker/cli/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

CMD ["/usr/bin/supervisord", "-n"]
