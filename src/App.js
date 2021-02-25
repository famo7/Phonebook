import axios from "axios";
import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const hook = () => {
    personService.getAll().then((allPeople) => {
      setPersons(allPeople);
    });
  };
  useEffect(hook, []);

  const addPhoneBook = (e) => {
    e.preventDefault();
    const result = persons.filter((i) => i.name === newName);
    if (result.length === 0) {
      personService
        .create({ name: newName, number: newNumber })
        .then((person) => {
          setPersons(persons.concat(person));
        });
      setNewName("");
      setNewNumber("");
    } else {
      alert(`${newName} is already in the phonebook`);
      setNewName("");
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };
  const handleFilter = (e) => {
    setNameFilter(e.target.value);
  };

  const handleDelete = (id) => {
    personService.deletePerson(id).then((person) => {
      setPersons(persons.filter((i) => i.id !== id));
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} handleFilter={handleFilter} />
      <h1>Add a New</h1>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPhoneBook={addPhoneBook}
      />

      <h2>Numbers</h2>
      <Persons
        persons={persons}
        nameFilter={nameFilter}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
