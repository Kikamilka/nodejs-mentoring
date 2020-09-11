import { Request } from "express"
import { User } from "./src/task2/models/user.model";

export interface CustomRequest extends Request {
    limitUsers?: Map<string, User>
}
