import { useState, useEffect } from "react";
import FilterForm from "./FilterForm";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

import personsService from './services/persons'
import Notification from './Notification'
const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [filterName, setFilterName] = useState("");
  const [showAll,setShowAll] = useState(true)
  const [notiMsg,setNotiMsg]=useState({type:null,text:null})

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
        const updatedPersonObj = {...existPerson,name:existPerson.name,number:newNumber}
        personsService.update(existPerson.id,updatedPersonObj).then(returnedPerson=>{
          setPersons(persons.map(p=>p.name!==existPerson.name ? p : returnedPerson))
          resetForm()
        }).catch(error=>{
          console.log(error.response)
          setNotiMsg({
            type:'fail',
            text:`Failed to update the info. ${error.response.data.error}`
          })
        })       
       
        return
      }
    }
    const newPersonObj = { name: newName, number: newNumber }
    //call to server
    personsService.create(newPersonObj)
      .then(returnedPerson=>{
        setPersons([...persons, returnedPerson ]);
        setNotiMsg({
            type:'success',
            text:`Added ${returnedPerson.name}`
          })
        setTimeout(() => {
          setNotiMsg({type:null,text:null})
        }, 5000)
        resetForm()
      })
      .catch(error=>{
        //console.log(error.response.data)
       setNotiMsg({
          type:'fail',
          text:`Failed to add ${newPersonObj.name}. ${error.response.data.error}`
        })
      setTimeout(() => {
        setNotiMsg({type:null,text:null})
      }, 5000)
      setPersons([...persons])
      
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
         setNotiMsg({
          type:'success',
          text:`Information of ${persons.find(p=>p.id === personId).name} has been removed from server`
        })
       setTimeout(() => {
        setNotiMsg({type:null,text:null})
      }, 5000)
      }).catch(error=>{
        setNotiMsg({
          type:'fail',
          text:`Information of ${persons.find(p=>p.id === personId).name} has been removed from server`
        })
       setTimeout(() => {
        setNotiMsg({type:null,text:null})
      }, 5000)
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
      {notiMsg && notiMsg.text && <Notification text={notiMsg.text} type={notiMsg.type}/>}
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
