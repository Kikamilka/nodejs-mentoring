import { UserGroup } from "../models/user-group.model";
import {sequelize} from "../configs/sequelize.config";

export class UserGroupDataAccessLayer {
  public getAllRelations = (): Promise<UserGroup[]> => {
    return UserGroup.findAll();
  };

  public getAllUsersByGroupId = (groupId: string): Promise<UserGroup[]> => {
    return UserGroup.findAll({
      where: {
        group_id: groupId,
      },
    });
  };

  public deleteUserRows = (userId: string): Promise<number> => {
    return UserGroup.destroy({
      where: {
        user_id: userId,
      },
    });
  };

  public deleteGroupRows = (groupId: string): Promise<number> => {
    return UserGroup.destroy({
      where: {
        group_id: groupId,
      },
    });
  };

  public addUsersToGroup = async (groupId: string, userIds: string[]): Promise<boolean> => {
    const t = await sequelize.transaction();

    try {
      for (const userId of userIds) {
        await UserGroup.create({
          user_id: userId,
          group_id: groupId,
        }, {transaction: t});
      }
      await t.commit();
      return true;
    } catch (error) {
      await t.rollback();
      return false;
    }
  };
}
