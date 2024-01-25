import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: 4405232523, id: 1 },
    { name: "Ada Lovelace", number: 39445323523, id: 2 },
    { name: "Dan Abramov", number: 1243234345, id: 3 },
    { name: "Mary Poppendieck", number: 39236423122, id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const addPersons = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    const filterDuplicate = persons.filter((item) =>
      item.name.includes(newName)
    );
    if (filterDuplicate.length > 0) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = [
        {
          name: newName,
          number: newNumber,
          id: persons.length + 1,
        },
      ];
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
      console.log(persons);
    }
  };

  const filterValue = persons.filter((item) =>
    item.name.toLowerCase().includes(newFilter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <h3>Add a new</h3>
      <PersonForm addPersons = {addPersons} setNewName ={setNewName} setNewNumber ={setNewNumber} newName ={newName} newNumber = {newNumber}/>
      <h2>Numbers</h2>
      <Persons persons={filterValue} />
    </div>
  );
};

const Display = ({ name, number }) => {
  return (
    <p>
      {name} {number}
    </p>
  );
};

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <Display key={person.id} name={person.name} number={person.number} />
      ))}
    </div>
  );
};

const Filter = ({ newFilter, setNewFilter }) => {
  return (
    <div>
      filter shown with{" "}
      <input value={newFilter} onChange={(event) => setNewFilter(event.target.value)} />
    </div>
  );
};

const PersonForm = ({ addPersons, setNewName, setNewNumber, newName, newNumber}) => {
  return(
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
      <input type="number" value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
};

export default App;
