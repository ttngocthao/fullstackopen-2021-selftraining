import React from "react";

const PersonForm = ({
  addNewPersonHandle,
  newName,
  nameChangeHandle,
  newNumber,
  numberChangeHandle,
}) => {
  return (
    <form onSubmit={addNewPersonHandle}>
      <div>
        name: <input type="text" value={newName} onChange={nameChangeHandle} />
      </div>
      <div>
        number:{" "}
        <input type="text" value={newNumber} onChange={numberChangeHandle} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
