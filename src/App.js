import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import List from './components/List';
import { ACTION_TYPES } from './Store';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const list = useSelector(prevState => prevState);
  const [mark, setMark] = useState(false);

  const dispatch = useDispatch();
  /*function dispatch(action) {
    const newList = reducer(action, list);
    setList(newList);
  }*/

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
      <List list={list} dispatch={ACTION_TYPES.CHECKED} />
    </>
  );
}
export default App;
