import { Role } from './Role';

export interface User {
    id?: number;
    name?: string;
    email?: string;
    username?: string;
    password?: string;
    gender?: string;
    hobbies?: string;
    avatarUrl?: string;
    role?: Role[];
}
