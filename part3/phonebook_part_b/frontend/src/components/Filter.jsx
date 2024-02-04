const Filter = ({ value, onChange }) => {
    return (
      <div >
        <p className="pt-5 ml-5 font-semibold text-xl">Filter shown with{" "}</p>
        <div>
        <input className="mx-5 my-5 shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Search phonebook"
          value={value}
          onChange={onChange}
        />
        </div>
      </div>
    );
  };

export default Filter;
  