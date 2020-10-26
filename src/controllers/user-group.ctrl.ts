import {UserGroupDataAccessLayer} from "../data-access/user-group.dal";

const dataAccessLayer = new UserGroupDataAccessLayer();

export const getUsersInGroupById = (groupId: string) => {
    return dataAccessLayer.getAllUsersByGroupId(groupId);
};

export const getAllUserGroup = () => {
    return dataAccessLayer.getAllRelations();
};

export const removeGroup = (groupId: string): Promise<number> => {
    return dataAccessLayer.deleteGroupRows(groupId);
};

export const removeUser = (userId: string) => {
    return dataAccessLayer.deleteUserRows(userId);
};

export const addUsersInGroup = (groupId: string, userIds: string[]) => {
    return dataAccessLayer.addUsersToGroup(groupId, userIds);
};

