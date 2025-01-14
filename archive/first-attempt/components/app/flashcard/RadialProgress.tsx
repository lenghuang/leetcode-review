export const RadialProgress = ({ value }: { value: number }) => {
  return (
    <div
      className="radial-progress m-2 text-xs"
      style={{ "--value": value, "--size": "2rem", "--thickness": "0.1rem" }}
      role="progressbar"
    >
      {value}%
    </div>
  );
};
