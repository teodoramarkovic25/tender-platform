import axios from "axios";
import jwtDecode from "jwt-decode";
import { LoginResponse } from "../../interfaces/login-response.interface";
import {UserModel} from "../../models/user.model";
import {LogoutResponse} from "../../interfaces/logout-response.interface";
import { getUser } from "../user.service";
const API_URL = process.env.REACT_APP_API_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;
class AuthService {
    // Login user and retrieve JWT token
    async login(email: string, password: string): Promise<LoginResponse | null> {
        try {
            const response = await axios.post<LoginResponse>(`${API_URL}/${API_VERSION}/auth/login`,
                { email, password });
            this.saveToken(response.data.tokens.access.token);
            return response.data;
        } catch (error) {
            console.error("Login failed:", error);
            return null;
        }
    }
    // Logout user and retrieve JWT token
    async logout(refreshToken: string): Promise<LogoutResponse | null> {
        try {
            const response = await axios.post<LogoutResponse>(`${API_URL}/${API_VERSION}/auth/logout`, { refreshToken });
            this.removeToken();
            return response.data;
        } catch (error) {
            console.error("Logout failed:", error);
            return null;
        }
    }
    // Save the JWT token in localStorage
    saveToken(token: string): void {
        localStorage.setItem("token", token);
    }
    // Retrieve the JWT token from localStorage
    getToken(): string | null {
        return localStorage.getItem("token");
    }
    // Remove the JWT token from localStorage
    removeToken(): void {
        localStorage.removeItem("token");
    }
    // // Check if the user is logged in
    // isLoggedIn(): boolean {
    //   const token = this.getToken();
    //   return token !== null;
    // }
    // Decode the JWT token and retrieve the user information
    async getUser(): Promise<UserModel | null> {
        const token = this.getToken();
        if (token) {
            const decoded: any = jwtDecode(token);
            const user = getUser(decoded.sub);
            return user;
        }
        return null;
    }
}
export default AuthService;