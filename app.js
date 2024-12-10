const client = mqtt.connect("ws://35.183.155.93:8083", {
    username: "ecosystem-connecte",
    password: "Omega123*",
  });
  const topic = "compteur/points";
  
  client.on("connect", () => {
    console.log("Connected to MQTT broker");
    client.subscribe(topic, (err) => {
      if (!err) {
        client.publish(topic, "Yo Oualid");
      }
    });
  });
  
  client.on("message", (topic, message) => {
    console.log(`New message on "${topic}":\n${message.toString()}\n`);
  });
  
  client.on("error", (error) => {
    console.error("Connection error:", error);
  });