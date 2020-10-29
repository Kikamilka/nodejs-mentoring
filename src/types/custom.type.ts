import { Request } from "express"
import {User} from "../models/user.model";

export interface CustomRequest extends Request {
    limitUsers?: Map<string, User>
}
