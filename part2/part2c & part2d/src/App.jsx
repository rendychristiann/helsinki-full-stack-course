import { useState, useEffect } from "react";
import personService from "./services/api";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPersons = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    const filterDuplicate = persons.filter((item) =>
      item.name.includes(newName)
    );
    if (filterDuplicate.length > 0) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: (persons.length + 1).toString(),
      };
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
      console.log(persons);
    }
  };

  const filterValue = persons.filter((item) =>
    item.name.toLowerCase().includes(newFilter.toLowerCase())
  );

  const toggleImportanceOf = (id) => {
    const findDelete = persons.find((n) => n.id === id);
    const willDelete = window.confirm(`Delete ${findDelete.name}?`);
    if (willDelete) {
      personService.remove(id).then((response) => {
        console.log(response);
        setPersons(persons.filter(person => person.id !== response.id));
      })
    }

    // const url = 'http://localhost:3001/persons'
    // const person = person.find(n => n.id === id)
    // const changedPerson = {...person}
    // personService
    //   .update(id, changedPerson)
    //     .then(returnedPerson => {
    //       setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
    //     })
    //   .catch(error => {
    //     alert(
    //       'the person was already deleted from the server'
    //     )
    //     setPersons(persons.filter(n => n.id !== id))
    //   })
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <h3>Add a new</h3>
      <PersonForm
        addPersons={addPersons}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filterValue} toggleImportanceOf={toggleImportanceOf} />
    </div>
  );
};

const Display = ({ name, number, onClick }) => {
  return (
    <p>
      {name} {number}
      <button onClick={onClick}>Delete</button>
    </p>
  );
};

const Persons = ({ persons, toggleImportanceOf }) => {
  return (
    <div>
      {persons.map((person) => (
        <Display
          key={person.id}
          name={person.name}
          number={person.number}
          onClick={() => {
            toggleImportanceOf(person.id);
          }}
        />
      ))}
    </div>
  );
};

const Filter = ({ newFilter, setNewFilter }) => {
  return (
    <div>
      filter shown with{" "}
      <input
        value={newFilter}
        onChange={(event) => setNewFilter(event.target.value)}
      />
    </div>
  );
};

const PersonForm = ({
  addPersons,
  setNewName,
  setNewNumber,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={addPersons}>
      <div>
        name:{" "}
        <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(event) => setNewNumber(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default App;
