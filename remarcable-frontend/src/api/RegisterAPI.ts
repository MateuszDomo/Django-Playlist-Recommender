import type { AxiosInstance } from "axios";
import type { User } from "../models/User";

export interface RegisterResponse {
  user: User;
}

export async function registerAPI(api: AxiosInstance, username: string, password: string): Promise<RegisterResponse> {
  try {
    const response = await api.post('/api/register/', {
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