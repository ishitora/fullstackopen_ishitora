//2.6.-2.11  2.15-2.20

import { useState, useEffect } from 'react';
import personService from './services/person';
import './index.css';

const Notification = ({ message }) => {
    if (message.msg === null) {
        return null;
    }
    return <div className={message.type}>{message.msg}</div>;
};

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
const Persons = ({ persons, filterWord, reqPerson }) => (
    <>
        {persons
            .filter((person) =>
                person.name
                    .toLowerCase()
                    .includes(filterWord.trim().toLowerCase())
            )
            .map((person) => (
                <>
                    <div key={person.id}>
                        {person.name} {person.number}{' '}
                        <button
                            onClick={() => {
                                if (window.confirm(`Delete ${person.name}?`)) {
                                    personService
                                        .deleteById(person.id)
                                        .then(() => {
                                            reqPerson();
                                        });
                                }
                            }}
                        >
                            delete
                        </button>
                    </div>
                </>
            ))}
    </>
);

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterWord, setFilterWord] = useState('');
    const [errorMessage, setErrorMessage] = useState({
        type: 'error',
        msg: null,
    });
    const reqPerson = () => {
        personService.getAll().then((response) => {
            setPersons(response);
        });
    };

    useEffect(() => {
        reqPerson();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newName.trim() === '' || newNumber.trim() === '') {
            return;
        }

        if (persons.find((person) => person.name === newName)) {
            if (
                window.confirm(
                    `name:${newName} is already added to phonebook,replace old number?`
                )
            ) {
                personService
                    .update(
                        persons.find((person) => person.name === newName).id,
                        {
                            name: newName,
                            number: newNumber,
                        }
                    )
                    .then(() => {
                        reqPerson();
                    })
                    .catch(() => {
                        setErrorMessage({
                            type: 'error',
                            msg: `${newName} has already been remove`,
                        });
                        setTimeout(() => {
                            setErrorMessage({
                                type: 'error',
                                msg: null,
                            });
                        }, 5000);
                    });
            }
        } else if (persons.find((person) => person.number === newNumber)) {
            alert(`phone number:${newNumber} is already added to phonebook`);
        } else {
            personService
                .create({
                    name: newName,
                    number: newNumber,
                })
                .then((response) => {
                    setPersons((prePersons) => {
                        return [...prePersons, response];
                    });
                    setErrorMessage({
                        type: 'success',
                        msg: `Added ${response.name}`,
                    });
                    setTimeout(() => {
                        setErrorMessage({
                            type: 'error',
                            msg: null,
                        });
                    }, 5000);
                    setNewName('');
                    setNewNumber('');
                });
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
            <Notification message={errorMessage} />
            <h3>Numbers</h3>
            <Persons
                persons={persons}
                filterWord={filterWord}
                reqPerson={reqPerson}
            />
        </div>
    );
};

export default App;
