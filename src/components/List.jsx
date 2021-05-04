import ListItem from './ListItem';
import React from 'react';

export default function List({ list, dispatch }) {
  if (list.length === 0) {
    return 'List is empty';
  }
  return (
      <ul>
        {list.map(item => (
            <ListItem
                id={item.id}
                key={item.id}
                title={item.title}
                isChecked={item.isChecked}
                dispatch={dispatch}
            />
        ))}
      </ul>
  );
}