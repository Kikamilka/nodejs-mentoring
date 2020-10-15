import {generateId} from "../utils";
import {Group} from "../models/group.model";
import {GroupAttributes} from "../types/group-attributes";

export class GroupDataAccessLayer {
    public getGroupById = (groupId: string): Promise<Group | null> => {
        return Group.findOne({where: {id: groupId}});
    };

    public getAllGroups = (): Promise<Group[]> => {
        return Group.findAll();
    };

    public updateGroup = (newGroup: GroupAttributes) => {
        return Group.update(newGroup, {
            where: {
                id: newGroup.id,
            },
        });
    };

    public createNewGroup = (group: GroupAttributes) => {
        return Group.create(
            {
                ...group,
                id: generateId().toString(),
            }
        );
    };

    public removeGroup = (groupId: string): Promise<number> => {
        return Group.destroy({
            where: {
                id: groupId
            }
        })
    };
}
