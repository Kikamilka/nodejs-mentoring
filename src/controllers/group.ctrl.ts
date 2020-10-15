import {GroupDataAccessLayer} from "../data-access/group.dal";
import {GroupAttributes} from "../types/group-attributes";

const dataAccessLayer = new GroupDataAccessLayer();

export const getGroupById = (groupId: string) => {
    return dataAccessLayer.getGroupById(groupId);
};

export const getAllGroups = () => {
    return dataAccessLayer.getAllGroups();
};

export const removeGroup = (groupId: string): Promise<boolean> => {
    return dataAccessLayer.removeGroup(groupId)
        .catch(() => {
            return Promise.resolve(false);
        }).then(() => {
            // возможно тут нужно проверить groups[0].length
            return Promise.resolve(true);
        })
};

export const updateGroup = (newGroup: GroupAttributes) => {
    return dataAccessLayer.updateGroup(newGroup);
};

export const createNewGroup = (group: GroupAttributes) => {
    return dataAccessLayer.createNewGroup(group);
};
