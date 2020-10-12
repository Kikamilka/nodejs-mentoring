import {Permission} from "./permission";

export interface GroupAttributes {
    id: string;
    name: string;
    permissions: Permission[];
}
