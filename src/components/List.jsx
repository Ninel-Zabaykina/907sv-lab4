import ListItem from './ListItem';
import { filteredListSelector } from '../Store';
import { useSelector } from 'react-redux';
import React from 'react';

export default function List() {
  const list = useSelector(filteredListSelector);
  if (list.length === 0) {
    return 'List is empty';
  }
  return (
    <ul>
      {list.map(item => (
        <ListItem id={item.id} key={item.id} title={item.title} isChecked={item.isChecked} />
      ))}
    </ul>
  );
}
