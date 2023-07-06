import axios from "axios";
import jwtDecode from "jwt-decode";
import { LoginResponse } from "../../interfaces/login-response.interface";
import ApiClient from "./api-client";

const AUTH_ENDPOINT = '/auth';

const loginUser = (data) => {
    return ApiClient.post(AUTH_ENDPOINT+ "/login", data)
        .then(response => response.data)
}

const AuthService = {
    loginUser
  // // Login user and retrieve JWT token
  // async login(username: string, password: string): Promise<LoginResponse | null> {
  //   try {
  //     const response = await axios.post<LoginResponse>(`${API_URL}/login`, { username, password });
  //     return response.data;
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //     return null;
  //   }
  // }
  //
  // // Save the JWT token in localStorage
  // saveToken(token: string): void {
  //   localStorage.setItem("token", token);
  // }
  //
  // // Retrieve the JWT token from localStorage
  // getToken(): string | null {
  //   return localStorage.getItem("token");
  // }
  //
  // // Remove the JWT token from localStorage
  // removeToken(): void {
  //   localStorage.removeItem("token");
  // }
  //
  // // Check if the user is logged in
  // isLoggedIn(): boolean {
  //   const token = this.getToken();
  //   return token !== null;
  // }
  //
  // // Decode the JWT token and retrieve the user information
  // getUser(): User | null {
  //   const token = this.getToken();
  //   if (token) {
  //     const decoded: any = jwtDecode(token);
  //     return { id: decoded.id, username: decoded.username };
  //   }
  //   return null;
  // }
}

export default AuthService;