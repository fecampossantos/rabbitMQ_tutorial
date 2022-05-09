let amqp = require("amqplib/callback_api");

// connecte
amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }

  // creates channel
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    // queue the receiver is going to consume from
    const queue = "hello";

    channel.assertQueue(queue, {
      durable: false,
    });

    // waits for message in queue
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    // consumes message when there is one
    channel.consume(
      queue,
      // callback func
      function (msg) {
        console.log(" [x] Received %s", msg.content.toString());
      },
      {
        noAck: true,
      }
    );
  });
});
