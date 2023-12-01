#!/usr/bin/env bash
caddy start --config=/Caddyfile
gunicorn runner:core_app -c gunicorn.conf.py --access-logfile -