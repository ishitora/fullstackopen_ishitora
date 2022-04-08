//2.6.-2.11

import { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({ filterWord, handleChangeFilter }) => (
    <>
        filter shown with:
        <input value={filterWord} onChange={handleChangeFilter} />
    </>
);
const PersonForm = ({
    newName,
    handleSubmit,
    handleChangeName,
    handleChangeNumber,
    newNumber,
}) => (
    <form onSubmit={handleSubmit}>
        <div>
            name: <input value={newName} onChange={handleChangeName} />
        </div>
        <div>
            number: <input value={newNumber} onChange={handleChangeNumber} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
);
const Persons = ({ persons, filterWord }) => (
    <>
        {persons
            .filter((person) =>
                person.name
                    .toLowerCase()
                    .includes(filterWord.trim().toLowerCase())
            )
            .map((person) => (
                <p key={person.name}>
                    {person.name} {person.number}
                </p>
            ))}
    </>
);

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterWord, setFilterWord] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/persons').then((response) => {
            setPersons((prePersons) => {
                return [...prePersons, ...response.data];
            });
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newName.trim() === '' || newNumber.trim() === '') {
            return;
        }

        if (persons.find((person) => person.name === newName)) {
            alert(`name:${newName} is already added to phonebook`);
        } else if (persons.find((person) => person.number === newNumber)) {
            alert(`phone number:${newNumber} is already added to phonebook`);
        } else {
            setPersons((prePersons) => {
                const clone = [...prePersons];
                clone.push({ name: newName, number: newNumber });
                return clone;
            });
            setNewName('');
            setNewNumber('');
        }
    };
    const handleChangeName = (e) => {
        setNewName(e.target.value);
    };
    const handleChangeNumber = (e) => {
        setNewNumber(e.target.value);
    };
    const handleChangeFilter = (e) => {
        setFilterWord(e.target.value);
    };
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter
                filterWord={filterWord}
                handleChangeFilter={handleChangeFilter}
            />
            <h3>Add a new</h3>
            <PersonForm
                newName={newName}
                newNumber={newNumber}
                handleSubmit={handleSubmit}
                handleChangeName={handleChangeName}
                handleChangeNumber={handleChangeNumber}
            />
            <h3>Numbers</h3>
            <Persons persons={persons} filterWord={filterWord} />
        </div>
    );
};

export default App;
