const client = mqtt.connect("ws://35.183.155.93:8083", {
  username: "ecosystem-connecte",
  password: "Omega123*",
});
const topic = "compteur/points";

const pointsTeam1 = document.querySelector(".points-team1");
const pointsTeam2 = document.querySelector(".points-team2");

let previousTeam1Score = 0;
let previousTeam2Score = 0;

const resultContainer = document.createElement("div");
resultContainer.classList.add("result");
resultContainer.style.textAlign = "center";
resultContainer.style.marginTop = "20px";
document.body.appendChild(resultContainer);

client.on("connect", () => {
  console.log("Connected to MQTT broker");
  client.subscribe(topic, (err) => {
    if (!err) {
      client.publish(topic, "Web Page connected");
    }
  });
});

client.on("message", (topic, message) => {
  console.log(`New message on "${topic}":\n${message.toString()}\n`);

  const scoreRegex = /^(\d+)\s(\d+)$/;
  const match = message.toString().match(scoreRegex);

  if (match) {
    const currentTeam1Score = parseInt(match[1], 10);
    const currentTeam2Score = parseInt(match[2], 10);

    if (currentTeam1Score === 0 && currentTeam2Score === 0) {
      if (previousTeam1Score > previousTeam2Score) {
        resultContainer.textContent = "Team 1 a gagné ! 🎉";
      } else if (previousTeam2Score > previousTeam1Score) {
        resultContainer.textContent = "Team 2 a gagné ! 🎉";
      } else {
        resultContainer.textContent = "C'est une égalité ! 🤝";
      }
      resultContainer.style.color = "gold";
      resultContainer.style.fontSize = "1.5rem";
      resultContainer.style.fontWeight = "bold";
      resultContainer.style.textShadow = "1px 1px 5px rgba(0, 0, 0, 0.5)";
    } else {
      resultContainer.textContent = "";
    }

    pointsTeam1.textContent = currentTeam1Score;
    pointsTeam2.textContent = currentTeam2Score;

    previousTeam1Score = currentTeam1Score;
    previousTeam2Score = currentTeam2Score;
  } else {
    console.error("Message format incorrect. Format attendu: 'x y' (e.g., '1 3')");
  }
});

client.on("error", (error) => {
  console.error("Connection error:", error);
});
