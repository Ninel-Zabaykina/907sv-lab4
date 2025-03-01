import React from 'react';
import { ACTION_TYPES } from '../Store';

export default function ListItem({ title, id, dispatch, isChecked }) {
    return (
        <li>
            <input
                defaultChecked={isChecked}
                onChange={() =>
                    dispatch({
                        type: ACTION_TYPES.CHECKED,
                        payload: id
                    })
                }
                data-testid="checkbox"
                type="checkbox"
            />
            {title}
            <button
                data-testid="delete_button"
                onClick={() =>
                    dispatch({
                        type: ACTION_TYPES.DELETE,
                        payload: id
                    })
                }
            >
                [x]
            </button>
        </li>
    );
}