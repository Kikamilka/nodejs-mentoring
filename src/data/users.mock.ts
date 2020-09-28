import {User} from "../models/user.model";

export const mapUsers: Map<string, User> = new Map([
    ['1', {
        id: '1',
        login: 'user 1',
        password: 'user1-password',
        age: 25,
        isDeleted: false,
    }],
    ['2', {
        id: '2',
        login: 'Katya',
        password: 'Katya-password',
        age: 40,
        isDeleted: false,
    }],
    ['3', {
        id: '3',
        login: 'Petya_Pupkin',
        password: 'user3-password',
        age: 8,
        isDeleted: false,
    }],
    ['15', {
        id: '15',
        login: 'user 15',
        password: 'user15-password',
        age: 3,
        isDeleted: false,
    }],
    ['200', {
        id: '200',
        login: 'user200',
        password: 'user200',
        age: 20,
        isDeleted: false,
    }],
    ['4', {
        id: '4',
        login: 'user_4',
        password: 'password',
        age: 15,
        isDeleted: false,
    }]
]);
