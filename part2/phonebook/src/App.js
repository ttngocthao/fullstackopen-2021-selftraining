import { useState, useEffect } from "react";
import FilterForm from "./FilterForm";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import axios from "axios";
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [filterName, setFilterName] = useState("");
  const [showAll,setShowAll] = useState(true)

  useEffect(() => {
    personsService.getAll().then(returnedPersons=>{
      setPersons(returnedPersons)
    }).catch(error=>{
      alert('error in getting all persons')
      console.log(error)
    })
   
  }, []);

  const personsToShow = showAll ? persons : persons.filter(p=>p.name.toLowerCase().includes(filterName.toLowerCase()))

  const addNewPersonHandle = (e) => {
    e.preventDefault();
    const existPerson = persons.filter((person) => person.name === newName)[0]
    
    if (existPerson&&existPerson.name) {
      const confirmMsg = `${existPerson.name} is already added to phonebook, replace the old number with a new one?`
      const confirmRes = window.confirm(confirmMsg)
      if(confirmRes){
        //update the phone number
        const updatedPersonObj = {...existPerson,number:newNumber}
        personsService.update(existPerson.id,updatedPersonObj).then(returnedPerson=>{
          setPersons(persons.map(p=>p.name!==existPerson.name ? p : returnedPerson))
          resetForm()
        }).catch(error=>{
          alert('error in updating number')
          setPersons(persons.filter(p=>p.name!==existPerson.name))
          console.log(error)
        })       
       
        return
      }
    }
    const newPersonObj = { name: newName, number: newNumber }
    //call to server
    personsService.create(newPersonObj).then(returnedPerson=>{
      setPersons([...persons, returnedPerson ]);
      resetForm()
    }).catch(error=>{
      alert('error in creating new item')
      setPersons([...persons])
      console.log(error)
    })
   
  };

  const nameChangeHandle = (e) => {
    setNewName(e.target.value);
  };

  const numberChangeHandle = (e) => {
    setNewNumber(e.target.value);
  };

  const filterChangeHandle = (e) => {
    setFilterName(e.target.value);
    setShowAll(false)
   };

  const deletePersonHandle =(personId)=>{
    const confirmMsg =`Are you sure that you want to delete this person whose id is ${personId}?`
    const confirmRes = window.confirm(confirmMsg)
    if(confirmRes){
      personsService.remove(personId).then(()=>{
        setPersons(persons.filter(p=>p.id!==personId))
      }).catch(error=>{
        alert('error in deleting this item')
        setPersons([...persons])
        console.log(error)
      })
      
    
    }
  }

  const resetForm =()=>{
     setNewName("");
     setNewNumber("");
  }

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
      <Persons personsToShow={personsToShow} deletePersonHandle={deletePersonHandle}/>
    </div>
  );
};

export default App;
