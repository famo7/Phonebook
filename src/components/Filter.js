import React from "react";

const Filter = ({ nameFilter, handleFilter }) => {
  return (
    <div>
      Filter by name: <input value={nameFilter} onChange={handleFilter} />
    </div>
  );
};

export default Filter;
