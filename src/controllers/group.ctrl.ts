import {GroupDataAccessLayer} from "../data-access/group.dal";
import {GroupAttributes} from "../types/group-attributes.type";

const dataAccessLayer = new GroupDataAccessLayer();

export class GroupController {
    public static async getGroupById(groupId: string) {
        return dataAccessLayer.getGroupById(groupId);
    }

    public static async getAllGroups() {
        return dataAccessLayer.getAllGroups();
    }

    public static async removeGroup(groupId: string) {
        return await dataAccessLayer.removeGroup(groupId).then((deletedNumber) => {
            return deletedNumber > 0;
        }).catch(() => {
            return false;
        })
    }

    public static async updateGroup(newGroup: GroupAttributes) {
        return dataAccessLayer.updateGroup(newGroup);
    }

    public static async createNewGroup(group: GroupAttributes) {
        return dataAccessLayer.createNewGroup(group);
    }
}
