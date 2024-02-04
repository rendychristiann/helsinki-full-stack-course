const PersonForm = ({
    onSubmit,
    onChange,
    newPerson
  }) => {
    return (
      <form onSubmit={onSubmit}>
        <div>
          <p className="pt-2 ml-5 font-normal text-md">Name:</p>
          <input className="mx-5 my-2 shadow appearance-none border rounded w-1/2 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="name"
            name="name" 
            value={newPerson.name}
            onChange={onChange}
          />
        </div>
        <div>
          <p className="ml-5 font-normal text-md">Number:</p>
          <input  className="mx-5 my-2 shadow appearance-none border rounded w-1/2 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="phone number"
            name="number" 
            value={newPerson.number}
            onChange={onChange}
          />
        </div>
        <div>
          <button type="submit" className="mx-5 my-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">add</button>
        </div>
      </form>
    );
  };

  export default PersonForm;