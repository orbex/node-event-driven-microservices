import { Kafka } from "kafkajs"

const kafka = new Kafka({
  clientId: "analytics-service",
  brokers: ["redpanda:9092"]
})

const consumer = kafka.consumer({
  groupId: "analytics-group"
})

async function start() {

  await consumer.connect()

  await consumer.subscribe({
    topic: "orders",
    fromBeginning: true
  })

  await consumer.run({

    eachMessage: async ({ message }) => {

      if (!message.value) return

      const order = JSON.parse(message.value.toString())

      console.log("Order received:", order)

      console.log("Processing analytics...")

    }

  })

}

start()
