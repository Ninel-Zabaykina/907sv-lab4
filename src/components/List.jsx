import ListItem from './ListItem';
import React from 'react';
import { filteredListSelector } from '../Selectors';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';

function List() {
  const state = useSelector(filteredListSelector);
  if (state.length === 0) {
    return 'List is empty';
  }
  return (
    <ul>
      {state.map(item => (
        <ListItem id={item.id} key={item.id} title={item.title} isChecked={item.isChecked} />
      ))}
    </ul>
  );
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps, null)(List);
