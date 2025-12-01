import express from "express";

// teszt adatok
let tasks = [
  { id: 1, title: "Expresst tanulni!", completed: false },
  { id: 2, title: "Git-et gyakorolni", completed: false },
  { id: 3, title: "Kiteregetni!", completed: false },
  { id: 3, title: "Bevásárolni!", completed: false },
];

const app = express(); // app létrehozása
const PORT = 5000;

app.use(express.json()); // middleware json

//test endpoint
app.get("/", (req, res) => {
  res.send("Hello! Ez az első apim");
});

//get all
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

//get by id
app.get("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task nem található" });
  }

  res.json(task);
});

// itt mondjuk meg melyik portra figyeljen az app
app.listen(PORT, () => {
  console.log(`Szerver fut: http://localhost:${PORT}`);
});
