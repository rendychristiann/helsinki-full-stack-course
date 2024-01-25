import Part from "./Part";
import Total from "./Total";

const Content = ({parts}) => {
    return (
      <div>
        {parts.map((part, idx) => (
          <Part key={idx} name={part.name} exercise={part.exercises} />
        ))}
        <Total parts = {parts} /> 
      </div>
    );
  };

export default Content;