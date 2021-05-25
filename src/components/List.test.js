import { screen, fireEvent } from '@testing-library/react';
import List from './List';
import React from 'react';
import { ACTION_TYPES } from '../Store';
import { makeTestStore, testRender } from '../setupTests';

const list = [
  {
    id: 1,
    text: '123',
    isChecked: true
  },
  {
    id: 2,
    text: '1234',
    isChecked: false
  },
  {
    id: 3,
    text: '12d3',
    isChecked: true
  }
];

const initialState = {
  list: list
};

test('correctly displays an empty array', () => {
  initialState.list = [];
  const store = makeTestStore({ initialState });
  testRender(<List />, { store });
  expect(screen.getByText('List is empty')).toBeInTheDocument();
});

test('correctly displays checkbox elements', () => {
  const store = makeTestStore({ initialState });
  testRender(<List />, { store });
  const checkboxes = screen.getAllByTestId('checkbox');
  for (let i = 0; i < checkboxes.length; i++) {
    expect(checkboxes[i]).toHaveAttribute(list[i].isChecked ? 'checked' : 'type');
  }
});

test('Checked checkbox called store.dispatch', () => {
  initialState.list = list;
  const store = makeTestStore({ initialState });
  testRender(<List />, { store });
  const checkboxes = screen.getAllByTestId('checkbox');
  for (let i = 0; i < list.length; i++) {
    expect(checkboxes[i]).toBeInTheDocument();
    expect(store.dispatch).not.toBeCalledWith({ type: ACTION_TYPES.CHECKED, payload: list[i].id });
    fireEvent.click(checkboxes[i]);
    expect(store.dispatch).toBeCalledWith({ type: ACTION_TYPES.CHECKED, payload: list[i].id });
  }
});

test('Correctly displays not empty list', () => {
  const store = makeTestStore({ initialState });
  testRender(<List />, { store });
  const elements = screen.getAllByTestId('text');
  expect(elements).toHaveLength(list.length);
  for (let i = 0; i < list.length; i++) {
    expect(elements).toHaveTextContent(list[i].title);
  }
});
