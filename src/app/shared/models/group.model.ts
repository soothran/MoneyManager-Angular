import { User } from './user.model';

export class Group {
    groupId?: string;
    title?: string;
    userId?: string;
    createdOn?: string;
    user?: User[];
    status?: string;
}
