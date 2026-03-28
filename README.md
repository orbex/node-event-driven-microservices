# Node Event Driven Microservices

## For development purposes only!

Example event-driven architecture using:

- Node.js
- TypeScript
- Kafka (Redpanda)
- Docker

Architecture:

order-service -> Kafka -> analytics-service

## Run

docker compose up

## Test

POST request:

http://localhost:3000/orders
