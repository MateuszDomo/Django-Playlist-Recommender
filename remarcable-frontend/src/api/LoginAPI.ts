import type { AxiosInstance } from "axios";
import type { User } from "../models/User";

export interface LoginResponse {
  token: string;
  user: User;
}

export async function loginAPI(api: AxiosInstance, username: string, password: string): Promise<LoginResponse> {
  try {
    const response = await api.post('/api/login/', {
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