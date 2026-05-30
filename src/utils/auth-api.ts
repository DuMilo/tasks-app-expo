import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const baseURL = process.env.EXPO_PUBLIC_API_URL;
const SESSION_TOKEN_KEY = 'sessionToken';

interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  sessionToken?: string;
  token?: string;
  accessToken?: string;
  message?: string;
}

const normalizeAuthResponse = (data: AuthResponse) => ({
  ...data,
  sessionToken: data.sessionToken || data.token || data.accessToken,
});

export const signup = async (payload: SignupPayload) => {
  const { data } = await axios.post<AuthResponse>(`${baseURL}/signup`, payload);
  return normalizeAuthResponse(data);
};

export const login = async (payload: LoginPayload) => {
  const { data } = await axios.post<AuthResponse>(`${baseURL}/login`, payload);
  return normalizeAuthResponse(data);
};

export const setSessionToken = (sessionToken: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${sessionToken}`;
};

export const saveSessionToken = async (sessionToken: string) => {
  await SecureStore.setItemAsync(SESSION_TOKEN_KEY, sessionToken);
  setSessionToken(sessionToken);
};

export const getStoredSessionToken = async () => {
  return SecureStore.getItemAsync(SESSION_TOKEN_KEY);
};

export const deleteStoredSessionToken = async () => {
  await SecureStore.deleteItemAsync(SESSION_TOKEN_KEY);
  delete axios.defaults.headers.common.Authorization;
};

export const validateSessionToken = async (sessionToken: string) => {
  setSessionToken(sessionToken);

  try {
    await axios.get(`${baseURL}`);
    return true;
  } catch (err) {
    await deleteStoredSessionToken();
    return false;
  }
};
