import ListItem from './ListItem';
// import React, { useState } from 'react';
//import { filteredListSelector } from '../Selectors';
import { useSelector } from 'react-redux';
//import { connect } from 'react-redux';

export default function List() {
  const list = useSelector(state => state.list);
  // const [mark] = useState(false);
  if (list.length === 0) {
    return 'List is empty';
  }
  return (
    <ul>
      {list
        // .filter(item => (item.isChecked && mark) || !mark)
        .map(item => (
          <ListItem id={item.id} key={item.id} title={item.title} isChecked={item.isChecked} />
        ))}
    </ul>
  );
}

/*const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps, null)(List);*/
