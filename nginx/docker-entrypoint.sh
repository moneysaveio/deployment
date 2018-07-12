#!/usr/bin/env bash
echo "starting nginx"
# Exit the script as soon as something fails.
set -e
exec "$@"
