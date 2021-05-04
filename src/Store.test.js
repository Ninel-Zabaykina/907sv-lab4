import reducer, { ACTION_TYPES, filteredList } from './store';
import ListItem from "./components/ListItem";

const title = 'ListItem';

describe('Check  Store.js', () => {
    test('Check add function', () => {
        const action = {
            type: ACTION_TYPES.ADD,
            payload: title
        };
        const newList = reducer(action, []);

        expect(newList.length).toEqual(1);
        expect(newList[0]).toHaveProperty('id');
        expect(newList[0].title).toEqual(title);
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
            payload: ListItem
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

        const checkedAction = {
            type: ACTION_TYPES.CHECKED,
            payload: list[1].id
        };
        list = reducer(checkedAction, list);

        const filList = filteredList({ list: list, mark: true });
        expect(filList.length).toEqual(1);
        expect(filList[0].id).toEqual(list[1].id);
    });

    test ('Check edit function', () => {
        const addAction = {
            type: ACTION_TYPES.ADD,
            payload: title
        };

        let list = reducer(addAction, []);
        const editAction = {
            type: ACTION_TYPES.EDIT,
            payload: title
        };

        list = reducer(editAction, list);
        expect(list[1]).not.toBe(title);
    });
});