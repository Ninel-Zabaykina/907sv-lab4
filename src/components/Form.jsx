import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ACTION_TYPES } from '../Store';
import { connect } from 'react-redux';

function Form() {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const list = useSelector(state => state);

  function handleSubmitInner(e) {
    e.preventDefault();
    if (value === '') return;
    for (let le in list.list) {
      if (list.list[le].title.toLowerCase().trim() === value.toLowerCase().trim()) {
        return;
      }
    }

    setValue('');

    dispatch({
      type: ACTION_TYPES.ADD,
      payload: value
    });
  }
  return (
    <form data-testid="form" onSubmit={handleSubmitInner}>
      <input data-testid="input" value={value} onChange={e => setValue(e.target.value)} />
      <button type="submit">Save</button>
    </form>
  );
}

export default connect(null, null)(Form);
