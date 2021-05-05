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
        <h2>Лабораторная №4 по теме &quot;Redux&quot;</h2>
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
