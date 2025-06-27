import axios from 'axios';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import type { UseApiClient } from './type';

export const API_BASE_URL = 'http://127.0.0.1:8000/';

export const useApiClient = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Token ${token}` } : {}),
    },
  });

  return api;
}