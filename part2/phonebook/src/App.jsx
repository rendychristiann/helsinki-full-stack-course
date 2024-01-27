import { useState, useEffect } from "react";
import personService from "./services/api";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)

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
      setErrorMessage(`${newName} is already added to phonebook`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
        setErrorMessage(`Added ${newName} to phonebook`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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
        setErrorMessage(`${findDelete.name} was deleted from the phonebook`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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
      <h2 className="text-teal-500 font-bold text-3xl pt-5 ml-5">Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <h3 className="text-teal-500 font-bold text-3xl ml-5">Add a new</h3>
      <PersonForm
        addPersons={addPersons}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <h2 className="text-teal-500 font-bold text-3xl py-5 ml-5">Numbers</h2>
      <Persons persons={filterValue} toggleImportanceOf={toggleImportanceOf} />
    </div>
  );
};

const Display = ({ name, number, onClick }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-1/2 text-sm text-left rtl:text-right">
        <tbody>
          <tr>
            <th scope="row" className="pl-5 whitespace-nowrap font-bold text-teal-500">{name}</th>
            <td className="font-semibold ">{number}</td>
            <td><button onClick={onClick} className="mx-5 my-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-1 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Delete</button></td>
          </tr>
        </tbody>
      </table> 
    </div>
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
    <div >
      <p className="pt-5 ml-5 font-semibold text-xl">Filter shown with{" "}</p>
      <div>
      <input className="mx-5 my-5 shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Search phonebook"
        value={newFilter}
        onChange={(event) => setNewFilter(event.target.value)}
      />
      </div>
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
        <p className="pt-2 ml-5 font-normal text-md">Name:</p>
        <input className="mx-5 my-2 shadow appearance-none border rounded w-1/2 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="name"
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
      </div>
      <div>
        <p className="ml-5 font-normal text-md">Number:</p>
        <input  className="mx-5 my-2 shadow appearance-none border rounded w-1/2 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="phone number"
          value={newNumber}
          onChange={(event) => setNewNumber(event.target.value)}
        />
      </div>
      <div>
        <button type="submit" className="mx-5 my-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">add</button>
      </div>
    </form>
  );
};

const Notification = ({message}) => {
  if (message === null){
    return null
  }
  return(
    <div className="text-black bg-slate-300 text-xl font-bold mx-5 my-5 px-5 py-5 border border-solid rounded-lg w-2/3 border-red-500">
      {message}
    </div>
  )
}

export default App;
