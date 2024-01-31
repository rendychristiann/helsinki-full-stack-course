import { useState, useEffect } from "react";
import personService from "../src/services/api";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [query, setQuery] = useState("");
  const [filteredPerson, setFilteredPerson] = useState(persons);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchData = async () => {
    try {
      const data = await personService.getAll();
      setPersons(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   personService.getAll().then((initialPersons) => {
  //     setPersons(initialPersons);
  //   });
  // }, []);

  const isDuplicate = (name) => {
    return persons.some((person) => person.name === name);
  };

  const isDuplicateNumber = (number) => {
    return persons.some((person) => person.number === number);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (newPerson.name.trim() === "") {
        setIsError(true);
        setErrorMessage("Please fill the name");
        return;
      }
      if (isDuplicateNumber(newPerson.number)) {
        setIsError(true);
        setErrorMessage(`${newPerson.number} is already added to phonebook`);
      }
      if (isDuplicate(newPerson.name)) {
        if (
          window.confirm(
            `${newPerson.name} is already on the list, replace the old number with the new one`
          )
        ) {
          const personToUpdateIdx = persons.findIndex(
            (person) => person.name === newPerson.name
          );
          const personToUpdate = persons[personToUpdateIdx];
          personService
            .update(personToUpdate.id, newPerson)
            .then((response) => {
              if (response && response.data) {
                setPersons((prev) =>
                  prev.map((person) =>
                    person.id === response.id
                      ? { ...person, number: response.data.number }
                      : person
                  )
                );
                setFilteredPerson((prev) =>
                  prev.map((person) =>
                    person.id === response.id
                      ? { ...person, number: response.data.number }
                      : person
                  )
                );
                setNewPerson({ name: "", number: "" });
                setIsError(false);
                setErrorMessage(`Successfully updated ${response.data.name}`);
              } else {
                setIsError(true);
                setErrorMessage("Invalid response format during update.");
                console.error(
                  "Invalid response format during update:",
                  response
                );
              }
            })
            .catch((error) => {
              setIsError(true);
              if (error.response && error.response.data) {
                setErrorMessage(`${error.response.data.error}`);
                console.log(error.response.data.error);
              } else {
                setErrorMessage("An error occurred while updating.");
                console.error("Error during update:", error);
              }
            });
        }
        return;
      }
      const response = await personService.create(newPerson);
      fetchData();
      console.log("Response from server:", response.data);  // Tambahkan pernyataan log ini
      if (response && response.data) {
        const createdPerson = response.data;
        const updatedPersons = [...persons, createdPerson];
        setPersons(updatedPersons);
        setFilteredPerson(updatedPersons);
        setNewPerson({ name: "", number: "" });
        setIsError(false);
        setErrorMessage(`Successfully created ${createdPerson.name}`);
      } 
    } catch (error) {
      setIsError(true);
      if (error.response && error.response.data) {
        setErrorMessage(`${error.response.data.error}`);
        console.log(error.response.data.error);
      } else {
        setErrorMessage("An error occurred while updating.");
        console.error("Error during update:", error);
      }
    }

    // if (filterDuplicate.length > 0) {
    //   setErrorMessage(`${newName} is already added to phonebook`);
    //   setTimeout(() => {
    //     setErrorMessage(null);
    //   }, 5000);
    // } else {
    //   const personObject = {
    //     name: newName,
    //     number: newNumber,
    //     id: (persons.length + 1).toString(),
    //   };
    //   personService.create(personObject).then((returnedPerson) => {
    //     setPersons((prevPersons) => [...prevPersons, returnedPerson]);
    //     console.log(persons);
    //     setNewName("");
    //     setNewNumber("");
    //     setErrorMessage(`Added ${newName} to phonebook`);
    //     setTimeout(() => {
    //       setErrorMessage(null);
    //     }, 5000);
    //   });
    //   console.log(persons);
    // }
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setNewPerson((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    console.log("New Person:", newPerson);
  }, [newPerson]);

  useEffect(() => {
    console.log("Persons after update:", persons); // Tambahkan pernyataan log ini
    const updatedFilteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(query)
    );
    setFilteredPerson(updatedFilteredPersons);
  }, [query, persons]);

  const handleQueryChange = (event) => {
    const newQuery = event.target.value.toLowerCase();
    setQuery(newQuery);
  };

  // const filterValue = persons.filter(
  //   (item) =>
  //     item.name && item.name.toLowerCase().includes(newFilter.toLowerCase())
  // );

  const deletePerson = (id) => {
    const findDelete = persons.find((n) => n.id === id);
    const willDelete = window.confirm(`Delete ${findDelete.name}?`);
    if (willDelete) {
      personService.remove(id).then((response) => {
        console.log(response);
        setPersons(persons.filter((person) => person.id !== response.id));
        setErrorMessage(`${findDelete.name} was deleted from the phonebook`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
    }
  };

  return (
    <div>
      <h2 className="text-teal-500 font-bold text-3xl pt-5 ml-5">Phonebook</h2>
      <Notification message={errorMessage} isError={isError} />
      <Filter value={query} onChange={handleQueryChange} />
      <h3 className="text-teal-500 font-bold text-3xl ml-5">Add a new</h3>
      <PersonForm
        onSubmit={handleSubmit}
        onChange={handleOnChange}
        newPerson={newPerson}
      />
      <h2 className="text-teal-500 font-bold text-3xl py-5 ml-5">Numbers</h2>
      <Persons persons={filteredPerson} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
