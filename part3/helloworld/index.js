require("dotenv").config();
const cors = require("cors");
const { request, response, json } = require("express");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const Note = require("./models/note");

const requestLogger = (request, response, next) => {
  console.log("Method: ", request.method);
  console.log("Path: ", request.path);
  console.log("Body: ", request.body);
  console.log("---");
  next();
};

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(requestLogger);

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

app.get("/", (request, response) => {
  response.send(
    `<h1>Notetaker App</p><a href="/index.html">Frontend App</a><a href="/api/notes">Notes data</a>`
  );
});

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (body.content === undefined) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
      content: body.content,
      important: body.important,
      date: new Date(),
  })
  
  note.save().then(savedNote => {
      response.json(savedNote)
  })
});

app.get("/api/notes/:id", (request, response) => {
  Note.findById(request.params.id).then(note => {
      response.json(note)
  })
});

app.put("api/notes/:id", (request, response) => {
  let id = request.body.id;
  let updatedNote = notes.find((note) => note.id === Number(request.body.id));
  updatedNote.imporant = !notes.id.important;

  let notes = [...notes, updatedNote];
  response.send(updatedNote);
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
