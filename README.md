# Hi! This is Unnatural Language Processing
I always loved the cursed sounds of old text to speech models, so I decided to recreate that nostalgia a little bit!

I trained an RNN-based model to predict the phonemes of English text, then my backend splices clips of my voice together to create an amalgamation that (roughly) sounds like the word!

It is currently over 93% accurate for words up to 10 characters long.

There may also be some missing sound files, feel free to leave an issue on this repo if your input doesn't generate a sound file.

This is currently deployed on my Raspberry Pi at https://ulp.timmald.com, so I apologize if it is down.

If you want to run it yourself, do the following:
1. Build the docker images in ulp-frontend (named `ulp`) and ulp-backend (named `ulp-api`)
2. Pull `tensorflow/serving` docker image 
3. use `run.sh` to set up all the docker containers!

