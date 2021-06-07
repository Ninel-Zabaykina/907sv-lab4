import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import List from './components/List';
import { ACTION_TYPES, SELECT_TYPES } from './Store';
import { useDispatch, useSelector } from 'react-redux';
// import { SELECT_TYPES } from './Store';

function App() {
  const list = useSelector(state => state);
  // const [mark] = useState(false);
  const [mark, setMark] = useState(false);
  // const [mark, setMark] = useState(SELECT_TYPES.ALL);
  // const choice = [SELECT_TYPES.DONE, SELECT_TYPES.ALL, SELECT_TYPES.NOT_DONE];
  const handleMark = () => {
    setMark(!mark);
    dispatch({
      type: ACTION_TYPES.FILTER,
      payload: mark
    });
  };
  const handleMarkRadio = event => {
    console.log(mark);
    console.log(event.target.value);
    console.log('RR3', list);
    // console.log('RRR', list);
    dispatch({
      type: ACTION_TYPES.FILTER_RADIO,
      payload: event.target.value.toString()
    });
  };

  // function onChangeValue(event) {
  //   console.log(event.target.value);
  // }

  const dispatch = useDispatch();

  function Done() {
    return <input checked={mark} onChange={handleMark} type="checkbox" />;
  }

  function DoneRadio() {
    return (
      <div>
        <input
          type="radio"
          id="todoChoice1"
          name="select"
          value={SELECT_TYPES.ALL}
          onChange={handleMarkRadio}
          defaultChecked={list.filterChecked === SELECT_TYPES.ALL}
        />
        <label htmlFor="todoChoice1">All</label>

        <input
          type="radio"
          id="todoChoice2"
          name="select"
          value={SELECT_TYPES.DONE}
          onChange={handleMarkRadio}
          defaultChecked={list.filterChecked === SELECT_TYPES.DONE}
        />
        <label htmlFor="todoChoice2">Done</label>

        <input
          type="radio"
          id="todoChoice3"
          name="select"
          value={SELECT_TYPES.NOT_DONE}
          onChange={handleMarkRadio}
          defaultChecked={list.filterChecked === SELECT_TYPES.NOT_DONE}
        />
        <label htmlFor="todoChoice3">Not Done</label>
      </div>
    );
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
        <DoneRadio />
        <label style={{ display: 'none' }}>
          Done:
          <Done />
        </label>
      </div>
      <List list={list} dispatch={ACTION_TYPES.FILTER} />
    </>
  );
}
export default App;
