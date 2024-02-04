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

export default Display