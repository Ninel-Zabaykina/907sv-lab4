import ListItem from './ListItem';
import React from 'react';
import filteredListSelector from '../Store';
import { useSelector } from 'react-redux';

export default function List() {
  const state = useSelector(filteredListSelector);
  if (state.list.length === 0) {
    return 'List is empty';
  }
  return (
    <ul>
      {state.list.map(item => (
        <ListItem id={item.id} key={item.id} title={item.title} isChecked={item.isChecked} />
      ))}
    </ul>
  );
}
