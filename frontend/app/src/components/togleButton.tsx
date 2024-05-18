import { useState } from "react";

function RadioButton() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="flex justify-center">
      <div className="mx-4 my-2">
        <label>
          <input
            type="radio"
            value="Week"
            checked={selectedOption === "Week"}
            onChange={handleOptionChange}
          />
          Week
        </label>
      </div>

      <div className="mx-4 my-2">
        <label>
          <input
            type="radio"
            value="Month"
            checked={selectedOption === "Month"}
            onChange={handleOptionChange}
          />
          Month
        </label>
      </div>

      <div className="mx-4 my-2">
        <label>
          <input
            type="radio"
            value="Year"
            checked={selectedOption === "Year"}
            onChange={handleOptionChange}
          />
          Year
        </label>
      </div>
    </div>
  );
}
export default RadioButton;
