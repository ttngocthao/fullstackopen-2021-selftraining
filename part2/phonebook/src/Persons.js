import React from "react";

const Persons = ({ personsToShow,deletePersonHandle }) => {
  return (
    <>
      {personsToShow.length !== 0 ? (
        personsToShow.map((p, i) => (
          <p key={i}>
            {p.name} - {p.number} <button onClick={()=>deletePersonHandle(p.id)}>Delete</button>
          </p>
        ))
      ) : (
        <p>List is empty</p>
      )}
    </>
  );
};

export default Persons;
