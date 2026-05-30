import axios from 'axios';

const baseURL = process.env.EXPO_PUBLIC_API_URL;

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
