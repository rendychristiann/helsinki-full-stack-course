const Total = ({parts}) => {
    const sum = parts.reduce((s,p) => {
      return s + p.exercises
    }, 0);
    return (
        <div>
            <p><strong>Total of {sum} exercises </strong></p>
        </div>
    );
  };

export default Total;