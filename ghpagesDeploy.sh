#!/bin/bash

 git config --global user.name "FennemaRL"
 git config --global user.mail "ld.fennema@gmail.com"
 git remote rm origin https://FennemaRL:${GH_TOKEN}@github.com/FennemaRL/Servify.git
 npm run deploy
