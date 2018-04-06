#!/bin/bash
npm run build -- --base-href "https://guillaumecabaret.github.io/hackathon/"
npm run deploy -- --repo="https://github.com/GuillaumeCabaret/hackathon.git"
