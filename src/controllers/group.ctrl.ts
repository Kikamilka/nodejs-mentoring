import {GroupDataAccessLayer} from "../data-access/group.dal";
import {GroupAttributes} from "../types/group-attributes.type";

const dataAccessLayer = new GroupDataAccessLayer();

export class GroupController {
    public async getGroupById(groupId: string) {
        return dataAccessLayer.getGroupById(groupId);
    }

    public async getAllGroups() {
        return dataAccessLayer.getAllGroups();
    }

    public async removeGroup(groupId: string) {
        return await dataAccessLayer.removeGroup(groupId).then((deletedNumber) => {
            return deletedNumber > 0;
        }).catch(() => {
            return false;
        })
    }


    public async updateGroup(newGroup: GroupAttributes) {
        return dataAccessLayer.updateGroup(newGroup);
    }

    public async createNewGroup(group: GroupAttributes) {
        return dataAccessLayer.createNewGroup(group);
    }
}
