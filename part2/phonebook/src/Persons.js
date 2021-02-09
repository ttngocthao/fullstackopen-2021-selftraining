import React from "react";

const Persons = ({ filterList }) => {
  return (
    <>
      {filterList.length !== 0 ? (
        filterList.map((p, i) => (
          <p key={i}>
            {p.name} - {p.number}
          </p>
        ))
      ) : (
        <p>List is empty</p>
      )}
    </>
  );
};

export default Persons;
