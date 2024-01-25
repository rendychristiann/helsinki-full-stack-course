import Part from "./Part";

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part, idx) => (
        <Part key={idx} name={part.name} exercise={part.exercise} />
      ))}
    </div>
  );
};

export default Content;
