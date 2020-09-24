import hardware
import dataProcessing
import ml

# Start recording (2 second chunk..)
chunk = hardware.recordData('/dev/cu.usbserial-DM02582X')
print(chunk.shape)

# Data Processing pipeline (2 second chunk..)
chunk = dataProcessing.process(chunk)
print(chunk.shape)

# ML Model return 1 or 0
prediction = ml.predict(chunk, './ml_model.pt')
print(prediction)
