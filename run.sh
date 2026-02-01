docker run --privileged --rm tonistiigi/binfmt --install all
docker run -p 5173:5173 ulp & #do the frontend
docker run -t --rm -p 8501:8501 -v "/home/timmald/Documents/Unnatural_Language_Processing/ulp-backend/serving/tensorflow_serving/servables/tensorflow/testdata/realEmbedding.model:/models/realEmbedding.model" -e MODEL_NAME=realEmbedding.model tensorflow/serving & # run the model API
docker run -v ./ulp-backend/output_file:/app/output_file -v ./ulp-backend/Voice_Files:/app/Voice_Files -p 3001:3001 ulp-api &

