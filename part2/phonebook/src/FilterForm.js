import React from "react";

const FilterForm = ({ filterChangeHandle, filterName }) => {
  return (
    <form>
      <p>
        Filter show with{" "}
        <input type="text" onChange={filterChangeHandle} value={filterName} />
      </p>
    </form>
  );
};

export default FilterForm;
