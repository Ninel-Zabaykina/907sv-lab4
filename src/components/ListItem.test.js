import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import ListItem from './ListItem';
import { ACTION_TYPES } from '../Store';
import { makeTestStore,testRender} from "../setupTests";

const id = 123;
const task = 'random text';
const checked = false;

const initialState = {
  list: [
    {
      id: id,
      title: task,
      isChecked: checked
    }
  ]
};

test('ListItem displays content', () => {
  const store = makeTestStore({ initialState });
  testRender(<ListItem title={task} id={id} isChecked={checked} />, { store });
  const display = screen.getByTestId('text');
  expect(display).toBeInTheDocument();
  expect(display).toHaveTextContent(task);
  screen.getByText(content => content.startsWith('random', 6));
});

test('Checked checkbox mark', () => {
  const store = makeTestStore({ initialState });
  testRender(<ListItem title={task} id={id} isChecked={true} />, { store });
  const checkbox = screen.getByTestId('checkbox');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).toHaveAttribute('checked');
});

test('Checked checkbox empty', () => {
  const store = makeTestStore({ initialState });
  testRender(<ListItem title={task} id={id} isChecked={false} />, { store });
  const checkbox = screen.getByTestId('checkbox');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).not.toHaveAttribute('checked');
});

test('Click button called store.dispatch', () => {
  const store = makeTestStore({ initialState });
  testRender(<ListItem title={task} id={id} isChecked={checked} />, { store });
  const button = screen.getByTestId('delete-button');
  expect(button).toBeInTheDocument();
  expect(store.dispatch).not.toBeCalled();
  fireEvent.click(button);
  expect(store.dispatch).toBeCalledWith({ type: ACTION_TYPES.CHECKED, payload: id });
});