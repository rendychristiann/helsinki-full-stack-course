const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use((request, response, next) => {
    if (request.method === 'POST' || request.method === 'GET') {
      return morgan(`:method :url :status :res[content-length] - :response-time ms - Response: :res[body]`)(request, response, next);
    }
    next();
  });

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/phonebook", (request, response) => {
  response.json(phonebook);
});

app.get("/info", (request, response) => {
  const currentTime = new Date();
  const totalEntries = phonebook.length;
  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  });
  const formattedTime = formatter.format(currentTime);
  const responseHTML = `
    <p>Phonebook contains ${(totalEntries)} entries.</p>
    <p>${formattedTime}</p>
  `;
  response.setHeader("Content-Type", "text/html");
  response.send(responseHTML );
});

app.get('/api/phonebook/:id', (request, response) => {
    const id = Number(request.params.id)
    const pb = phonebook.find(pb => pb.id === id)
    if (pb) {
        response.json(pb)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/phonebook/:id', (request, response) => {
    const id = Number(request.params.id)
    phonebook = phonebook.filter (pb => pb.id !== id)
    response.status(204).end()
})

const generateId = () => {
    const maxId = phonebook.length > 0 ? Math.max(...phonebook.map(n => n.id)) : 0;
    return maxId + 1;
}

app.post('/api/phonebook', (request, response) => {
    const {name, number} = request.body;
    const duplicates = phonebook.find(pb => pb.name === name);
    if (duplicates) {
        return response.status(400).json({
            error: "Name must be unique"
        })
    }
    if (!name || !number){
        return response.status(404).json({
            error: 'Name or number are required '
        })
    }
    const pb = {
        id: generateId(),
        name,
        number
    }
    phonebook = phonebook.concat(pb);
    console.log(phonebook);
    response.json(phonebook);
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
