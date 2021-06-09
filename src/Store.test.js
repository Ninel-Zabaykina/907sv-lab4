import reducer, { ACTION_TYPES, initialState } from './store';
import { makeTestStore } from './setupTests';
import { useSelector } from 'react-redux';
import { filteredListSelector } from './store';

const title = 'ListItem';
const add = content => ({
  type: ACTION_TYPES.ADD,
  payload: content
});

describe('Check  Store.js', () => {
  test('Check add function', () => {
    const text = 'fig';
    const expectedAction = {
      type: ACTION_TYPES.ADD,
      payload: text
    };
    expect(add(text)).toEqual(expectedAction);
    const newList = reducer(add(text), initialState);

    expect(newList.list).toHaveLength(1);
    expect(newList[0]).toHaveProperty('id');
    expect(newList[0].title).toEqual(text);
  });

  test('Check delete function', () => {
    const addAction = {
      type: ACTION_TYPES.ADD,
      payload: title
    };

    let list = reducer(addAction, []);

    const delAction = {
      type: ACTION_TYPES.DELETE,
      payload: list[0].id
    };

    list = reducer(delAction, list);

    expect(list.length).toEqual(0);
  });

  test('Check checked function', () => {
    const addAction = {
      type: ACTION_TYPES.ADD,
      payload: title
    };

    let list = reducer(addAction, []);

    const checkedAction = {
      type: ACTION_TYPES.CHECKED,
      payload: list[0].id
    };

    list = reducer(checkedAction, list);
    expect(list[0].isChecked).toBeTruthy();
  });
});

const state_do = {
  list: [
    {
      id: '1',
      title: 'eat ice-cream',
      isChecked: true
    },
    {
      id: '2',
      title: 'scratch belly',
      isChecked: true
    },
    {
      id: '3',
      title: 'roll over on the left side',
      isChecked: false
    }
  ],
  filterChecked: true
};

test('Экшен store.dispatch({ type: ACTION_TYPES.FILTER }) будет менять состояние фильтра в сторе', () => {
  const expectationState = reducer(undefined, { type: ACTION_TYPES.FILTER });
  expect(expectationState.filterChecked).toBe(false);
});

test('Селектор будет формировать массив элементов с учётом текущего состояния стора.', () => {
  const result = filteredListSelector(state_do);
  expect(result.length).toEqual(3);
});

test ('check of searchbar action', () => {
  const action = {
    type: ACTION_TYPES.SEARCHBAR,
    payload: 'testik'
  };
  const state = reducer(undefined, action);
  expect(state.filter.searchBar).toBe(action.payload);
});
