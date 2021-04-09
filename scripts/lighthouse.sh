#!/bin/bash

lighthouse http://localhost:8080 --chrome-flags="--headless" --only-categories=accessibility,best-practices,performance --output=json --output-path=./dist/report.json --save-assets
