import {GroupController} from "./group.ctrl";

describe('Group controller', () => {
    it('getGroupById method', async () => {
        expect.assertions(1);
        const data = await GroupController.getGroupById('1602579690829');
        expect(data?.getDataValue("name")).toEqual('Group2');
    });

    it('getAllGroups method', async () => {
        expect.assertions(1);
        const data = await GroupController.getAllGroups();
        expect(data.length).toEqual(3);
    });

    it('removeGroup method with wrong id', async () => {
        expect.assertions(1);
        const data = await GroupController.removeGroup('001');
        expect(data).toBeFalsy();
    });

    it('createNewGroup method', async () => {
        expect.assertions(1);
        const data = await GroupController.createNewGroup({
            name: 'TestGroup',
            permissions: ["WRITE", "READ"]
        });
        expect(data?.getDataValue("name")).toEqual('TestGroup');
    });

    it('updateGroup method with wrong id', async () => {
        expect.assertions(1);

        const data = await GroupController.updateGroup({
            id: '001',
            name: 'TestGroupUpdate',
            permissions: ["WRITE"]
        });
        expect(data[0]).toEqual(0);

    });
});
