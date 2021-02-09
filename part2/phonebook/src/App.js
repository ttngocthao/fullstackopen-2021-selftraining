import { useState } from "react";
import FilterForm from "./FilterForm";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [filterList, setFilterList] = useState(persons);
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [filterName, setFilterName] = useState("");
  const addNewPersonHandle = (e) => {
    e.preventDefault();
    if (persons.filter((person) => person.name === newName).length !== 0) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      return;
    }
    setPersons([...persons, { name: newName, number: newNumber }]);
    setFilterList([...filterList, { name: newName, number: newNumber }]);
    setNewName("");
    setNewNumber("");
  };
  const nameChangeHandle = (e) => {
    setNewName(e.target.value);
  };
  const numberChangeHandle = (e) => {
    setNewNumber(e.target.value);
  };
  const filterChangeHandle = (e) => {
    setFilterName(e.target.value);
    const newList = persons.filter((p) =>
      p.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterList(newList.length !== 0 ? newList : persons);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm
        filterChangeHandle={filterChangeHandle}
        filterName={filterName}
      />

      <h3>Add new person</h3>
      <PersonForm
        addNewPersonHandle={addNewPersonHandle}
        newName={newName}
        nameChangeHandle={nameChangeHandle}
        newNumber={newNumber}
        numberChangeHandle={numberChangeHandle}
      />

      <h2>Numbers</h2>
      <Persons filterList={filterList} />
    </div>
  );
};

export default App;
