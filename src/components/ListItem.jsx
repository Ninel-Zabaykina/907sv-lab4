import React from 'react';
import { ACTION_TYPES } from '../Store';
import { useDispatch } from 'react-redux';

export default function ListItem({ title, id, isChecked }) {
  const dispatch = useDispatch();
  return (
    <li>
      <input
        defaultChecked={isChecked}
        onChange={() => dispatch({ type: ACTION_TYPES.CHECKED, payload: id })}
        data-testid="checkbox"
        type="checkbox"
      />
      {title}
      <button
        data-testid="delete_button"
        onClick={() =>
          dispatch({
            type: ACTION_TYPES.DELETE,
            payload: id
          })
        }
      >
        [x]
      </button>
    </li>
  );
}
