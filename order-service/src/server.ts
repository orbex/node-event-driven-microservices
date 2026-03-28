import Fastify from "fastify"
import { Kafka } from "kafkajs"

const fastify = Fastify({ logger: true })

const kafka = new Kafka({
  clientId: "order-service",
  brokers: ["redpanda:9092"]
})

const producer = kafka.producer()

async function start() {

  await producer.connect()

  fastify.post("/orders", async () => {

    const order = {
      id: Math.floor(Math.random() * 100000),
      userId: Math.floor(Math.random() * 1000),
      amount: Math.floor(Math.random() * 500),
      createdAt: new Date().toISOString()
    }

    await producer.send({
      topic: "orders",
      messages: [{ value: JSON.stringify(order) }]
    })

    return { status: "order created", order }

  })

  await fastify.listen({
    port: 3000,
    host: "0.0.0.0"
  })

}

start()
