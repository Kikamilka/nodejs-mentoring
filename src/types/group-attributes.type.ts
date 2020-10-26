import {Permission} from "./permission.type";

export interface GroupAttributes {
    id: string;
    name: string;
    permissions: Permission[];
}
