import axios from "axios";
import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/persons";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);

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
      const newObject = { name: newName, number: newNumber };
      personService.create(newObject).then((person) => {
        setPersons(persons.concat(person));
      });
      setSuccessMessage(`${newObject.name} has been added to the phonebook`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
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
    const confirm = window.confirm("you sure you want  to delete this person?");
    if (confirm) {
      personService.deletePerson(id).then((person) => {
        setPersons(persons.filter((i) => i.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
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
