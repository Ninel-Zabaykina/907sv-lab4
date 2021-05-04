import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import List from './components/List';
import reducer, { ACTION_TYPES, filteredList } from './Store';


function App() {
  const [list, setList] = useState([]);
  const [mark, setMark] = useState(false);

    function dispatch(action) {
        const newList = reducer(action, list);
        setList(newList);
    }

    return (
        <>
            <div>
                <h1>Список делов</h1>
                <h2>Лабораторная №3. Список с фильтрацией</h2>
            </div>
            <Form
                handleSubmit={value =>
                    dispatch({
                        type: ACTION_TYPES.ADD,
                        payload: value
                    })
                }

            />
            <div>
                <label>
                    Done:
                    <input checked={mark} onChange={() => setMark(!mark)} type="checkbox" />
                </label>
            </div>
            <List list={filteredList({ list, mark })} dispatch={dispatch} />
        </>
    );
}
export default App; 

  /*function add(value) {
    const newEl = {
      id: Math.random().toString(),
      text: value,
      isChecked: false
    };
    setList([...list, newEl]);
  }

  function del(index) {
    list.splice(index, 1);
    setList([...list]);
  }

  return (
      <>
        <h3>Список делов</h3>
        <Form handleSubmit={value => add(value)} />
        <List list={list} deleteHandler={index => del(index)} />
      </>
  );



              /*<List list={filteredList({ list, mark })} dispatch={dispatch} />
}*/


