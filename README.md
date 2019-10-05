Technology Used	: AWS Lambda, Dynamodb, API Gateway, Cloud Watch Events
Components Used	: Arduino, RF module, GPRS module, Potentiometer, Resistors
Description	: Our solution is to install depth sensors at the tanks which supply water to various consumers. These tanks are in return supplied water from the municipality. Depth sensors record water levels at ever regular intervals. These recordings are stored at the cloud after being associated with a timestamp. At the cloud, when a water level is below the acceptable minimum, an alert is raised.
