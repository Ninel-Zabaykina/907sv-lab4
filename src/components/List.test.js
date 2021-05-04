import { render, screen, fireEvent } from '@testing-library/react';
import List from './List';
import React from 'react';
import { ACTION_TYPES } from "../Store";

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

test('correctly displays an empty array', () => {
  const dispatch = jest.fn();
  render(<List list={[]} dispatch={dispatch} />);
  expect(screen.getByText('List is empty')).toBeInTheDocument();
});

test('correctly displays checkbox elements', () => {
  render(<List list={list} />);
  const checkboxes = screen.getAllByTestId('checkbox');
  for (let i = 0; i < checkboxes.length; i++) {
    expect(checkboxes[i]).toHaveAttribute(list[i].isChecked ? 'checked' : 'type');
  }
});

test('Checked called checkHandler', () => {
  const dispatch = jest.fn();
  render(<List list={list} dispatch={dispatch} />);
  const checkboxes = screen.getAllByTestId('checkbox');
  for (let i = 0; i < checkboxes.length; i++) {
    fireEvent.click(checkboxes[i]);
    expect(dispatch).toBeCalledWith({ type: ACTION_TYPES.CHECKED, payload: list[i].id });
  }
});