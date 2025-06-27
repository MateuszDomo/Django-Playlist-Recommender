import type { User } from "../models/User";
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/'; 
const api = axios.create({
  baseURL: API_BASE_URL,
});

export interface LoginResponse {
  token: string;
  user: User;
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  try {
    const response = await axios.post('/api/login/', {
      username,
      password,
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}