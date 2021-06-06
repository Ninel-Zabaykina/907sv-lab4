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

  /*test('Check filter', () => {
    const testData = [
      {
        id: '123',
        title: 'test text1',
        isChecked: true
      },
      {
        id: '456',
        title: 'test text2',
        isChecked: false
      },
      {
        id: '789',
        title: 'test text3',
        isChecked: true
      }
    ];
    const expectedAction = {
      type: ACTION_TYPES.FILTER,
      payload: selector
    };
    expect(filter(SELECTOR_TYPES.DONE)).toEqual(expectedAction);
  });

  const addAction = {
    type: ACTION_TYPES.ADD,
    payload: 'wash car'
  };
  let list = reducer(addAction, []);
  list = reducer(addAction, list);

  const checkAction = {
    type: ACTION_TYPES.CHECKED,
    payload: list[1].id
  };
  list = reducer(checkAction, list);

  const filList = filteredList({ list: list, mark: true });
  expect(filList.length).toEqual(1);
  expect(filList[0].id).toEqual(list[1].id);*/
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
  expect(expectationState.filterChecked).toBe(true);
});

test('Селектор будет формировать массив элементов с учётом текущего состояния стора.', () => {
  const result = filteredListSelector(state_do);
  expect(result.length).toEqual(2);
});
