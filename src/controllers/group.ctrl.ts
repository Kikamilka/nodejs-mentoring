import {DataAccessLayer} from "../data-access/data-access";
import {GroupAttributes} from "../types/group-attributes";

const dataAccessLayer = new DataAccessLayer();

const getGroupById = (groupId: string) => {
    return dataAccessLayer.getGroupById(groupId);
};

const getAllGroups = () => {
    return dataAccessLayer.getAllGroups();
};

const removeGroup = (groupId: string): Promise<boolean> => {
    return dataAccessLayer.removeGroup(groupId)
        .catch(() => {
            return Promise.resolve(false);
        }).then(() => {
            // возможно тут нужно проверить groups[0].length
            return Promise.resolve(true);
        })
};

const updateGroup = (newGroup: GroupAttributes) => {
    return dataAccessLayer.updateGroup(newGroup);
};

const createNewGroup = (group: GroupAttributes) => {
    return dataAccessLayer.createNewGroup(group);
};

export {
    createNewGroup,
    getAllGroups,
    getGroupById,
    removeGroup,
    updateGroup
};
