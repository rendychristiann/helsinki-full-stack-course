const Total = (props) => {
    let total = 0;
    props.parts.forEach((part) => (
        total = total + part.exercise
    ));

    return (
        <div>
            <p>Number of exercise {total}</p>
        </div>
    );
  };

export default Total;