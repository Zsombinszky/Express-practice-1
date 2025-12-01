import express from "express";

// teszt adatok
let tasks = [
  { id: 1, title: "Expresst tanulni!", completed: false },
  { id: 2, title: "Git-et gyakorolni", completed: false },
  { id: 3, title: "Kiteregetni!", completed: false },
  { id: 4, title: "Bevásárolni!", completed: false },
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

//create
app.post("/api/tasks", (req, res) => {
  const { title, completed } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title kötelező!" });
  }

  const newID = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;

  const task = {
    id: newID,
    title: title,
    completed: completed ?? false,
  };

  tasks.push(task);

  res.status(201).json(task);
});

//update
app.put("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const { title, completed } = req.body;

  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task nem található" });
  }

  if (!title) {
    return res.status(400).json({ message: "Title kötelező" });
  }

  const updatedTask = {
    id,
    title,
    completed: completed ?? false,
  };

  tasks[taskIndex] = updatedTask;

  res.json(updatedTask);
});

//delete
app.delete("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task nem található" });
  }

  const deletedTask = tasks[taskIndex];
  tasks.splice(taskIndex, 1);

  res.json({ message: "Task törölve", deleted: deletedTask });
});

// itt mondjuk meg melyik portra figyeljen az app
app.listen(PORT, () => {
  console.log(`Szerver fut: http://localhost:${PORT}`);
});
