import reducer, { ACTION_TYPES, filteredList, initialState } from './store';
import ListItem from './components/ListItem';

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

  test('Check filter', () => {
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
    expect(filList[0].id).toEqual(list[1].id);
  });
});
