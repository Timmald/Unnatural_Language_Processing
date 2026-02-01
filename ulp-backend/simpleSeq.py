import pickle
import numpy as np
import json
import tensorflow as tf



with open('training.pickle', 'rb') as f:
    training_data = pickle.load(f)
vocab = list('\0æɐɑβɓçɕðʒɖɗəɚɵɛɜɝɠɡɢħɦɥɧʜɨɪʝɟɫɭɬʟɮɱŋɲɳɴɔœɒøɸɾɹʁʀɻɽʃʂθʈʊʉʌʋɯʍχɣʎʏɤʐʑʔʕabcdefghijklmnopqrstuvwxyz')
X_train = np.array(training_data['english'])
y_train = np.array(training_data['ipa'])
print('ready to declare!')
# define the model architecture
model = tf.keras.models.Sequential()
model.add(tf.keras.layers.InputLayer(input_shape=(10,)))
model.add(tf.keras.layers.Embedding(len(vocab), len(vocab)))
model.add(tf.keras.layers.LSTM(len(vocab), return_sequences=True, activation='relu'))
model.add(tf.keras.layers.LSTM(len(vocab), return_sequences=True, activation='relu', go_backwards=True))
model.add(tf.keras.layers.LSTM(len(vocab),return_sequences=True, activation='softmax'))
# compile the model
loss = tf.keras.losses.SparseCategoricalCrossentropy()
model.compile(loss=loss, optimizer='adam', metrics=['accuracy'])
# train the model
print("training!")
y_train = np.argmax(y_train,-1)
model.fit(X_train, y_train, epochs=100)
model.save('realEmbedding.model')