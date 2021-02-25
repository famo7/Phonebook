import React from "react";

const Persons = ({ persons, nameFilter, handleDelete }) => {
  return (
    <div>
      {persons
        .filter((i) => {
          if (nameFilter === "") {
            return i;
          } else if (
            i.name.toLocaleLowerCase().includes(nameFilter.toLowerCase())
          ) {
            return i;
          }
        })
        .map((i) => {
          return (
            <div key={i.id}>
              <p>
                {i.name} {i.number}
                <button
                  onClick={() => {
                    handleDelete(i.id);
                  }}
                >
                  Delete
                </button>
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default Persons;
