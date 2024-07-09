export const MultipleChoiceRadioButtons = () => {
  // Dummy backend data
  const choices = [
    "lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here ",
    "lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here ",
    "lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here lots of text here ",
  ];

  return (
    <>
      <h2 className="text-lg font-bold">Choose the correct approach</h2>
      {choices.map((choice, i) => (
        <RadioChoice key={i} label={choice} />
      ))}
      <div className="btn btn-block btn-primary mt-8 rounded-xl">
        Select Answer
      </div>
    </>
  );
};

const RadioChoice = ({ label }: { label: string }) => {
  return (
    <div className="form-control checked:bg-primary">
      <label className="label cursor-pointer">
        <input
          type="radio"
          name="radio-10"
          className="radio checked:bg-primary"
        />
        <span className="label-text pl-4 pr-2">{label}</span>
      </label>
    </div>
  );
};
