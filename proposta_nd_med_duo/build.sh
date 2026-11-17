#!/bin/bash
git pull && docker build -t proposta-nd-med-duo:latest . && docker stack deploy -c docker-compose.yml proposta-nd-med-duo && docker service update --force --image proposta-nd-med-duo:latest proposta-nd-med-duo_proposta-nd-med-duo
