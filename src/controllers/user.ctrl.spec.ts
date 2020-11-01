import {UserController} from "./user.ctrl";

// большая часть данных для сверки зависит от данных БД
// нужно мокать данные из БД для исключения ошибок после обновления БД
// но это не unit test

describe('User controller', () => {
    it('getUserById method', async () => {
        expect.assertions(1);
        const data = await UserController.getUserById('001');
        expect(data?.getDataValue("login")).toEqual('kamila');
    });

    it('getAllUsers method', async () => {
        expect.assertions(1);
        const data = await UserController.getAllUsers();
        expect(data.length).toEqual(9);
    });

    it('deleteUser method', async () => {
        expect.assertions(1);
        const data = await UserController.deleteUser('002');
        expect(data).toBeTruthy();
    });

    it('getDeletedUsers method', async () => {
        expect.assertions(1);
        const data = await UserController.getDeletedUsers();
        expect(data.length).toEqual(3);
    });

    it('updateUser method', async () => {
        expect.assertions(1);
        const data = await UserController.updateUser({
            "id": "1603458755197",
            "login": "VasiliyUpdate",
            "password": "V11",
            "age": 60,
            "isDeleted": false
        });
        expect(data.length).toEqual(1);
    });

    it('createNewUser method', async () => {
        expect.assertions(1);
        try {
            const data = await UserController.createNewUser({
                login: 'testUser01',
                age: 30,
                isDeleted: false,
                password: 'test01'
            });
            expect(data?.getDataValue("login")).toEqual('testUser01');
        } catch (e) {
            expect(e.errors[0].message).toEqual('login must be unique');
        }
    });

    it('getLimitUsers method', async () => {
        const data = await UserController.getLimitUsers(3, 'user');
        expect(data.rows[0].getDataValue('login')).toContain('user');
        expect(data.rows.length).toBeLessThanOrEqual(3);
    });

});
