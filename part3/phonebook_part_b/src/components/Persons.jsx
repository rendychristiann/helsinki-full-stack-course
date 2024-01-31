import Display from "./Display";

const Persons = ({ persons, deletePerson }) => {
  console.log("Persons Data:", persons); // Tambahkan ini
    return (
      <div>
        {persons.map((person) => (
          <Display
            key={person.id}
            name={person.name}
            number={person.number}
            onClick = {() => deletePerson(person.id)}
          />
        ))}
      </div>
    );
  };

export default Persons;