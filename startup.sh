#!/bin/sh
# Azure App Service startup: install deps on Linux, then build and run Next.js
# Fixes ENOENT when node_modules is deployed from Windows
cd /home/site/wwwroot
npm install
node node_modules/next/dist/bin/next build
exec node node_modules/next/dist/bin/next start
