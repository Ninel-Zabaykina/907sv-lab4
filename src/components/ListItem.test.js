import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ListItem from './ListItem';
import { ACTION_TYPES} from "../Store";

const id = 123;
const text = 'random text';

test('ListItem displays content and reacts to the button', () => {
  const id = '321'
  const text = 'text'
  const dispatch = jest.fn();

  render(<ListItem text={text} id={id} dispatch={dispatch} />);
  const submitButton = screen.queryByText(text)
  expect(submitButton).toBeNull() // it doesn't exist

  const button = screen.getByTestId('delete_button');
  expect(button).toBeInTheDocument();
  fireEvent.click(button);

  expect(dispatch).toBeCalledWith({payload: id, type: ACTION_TYPES.DELETE});
});

test('Checked checkbox mark', () => {
  render(<ListItem id={id} text={text} isChecked={true} />);
  const checkbox = screen.getByTestId('checkbox');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).toHaveAttribute('checked');
});

test ('Checked checkbox empty', () => {
  render(<ListItem id={id} text={text} isChecked={false} />);
  const checkbox = screen.getByTestId('checkbox');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).not.toHaveAttribute('checked');
});





