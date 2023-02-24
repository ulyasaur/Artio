import { User } from "./user";

export default interface AuthResponse {
    user: User;
    token: string;
}