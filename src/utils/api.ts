import { AuthApi, ClassesApi, StudentsApi, Configuration, TeachersApi } from "../api";

export const configuration = (token?: string): Configuration => {
  const config = new Configuration();
  if (token) {
    config.apiKey = token;
    config.baseOptions = { headers: { Authorization: token } };
  }
  return config;
}

export const authApi = (token?: string): AuthApi => {
  const api = new AuthApi(configuration(token));
  return api;
};

export const classesApi = (token: string): ClassesApi => {
  const api = new ClassesApi(configuration(token));
  return api;
};

export const teachersApi = (token: string): TeachersApi => {
  const api = new TeachersApi(configuration(token));
  return api;
};

export const studentsApi = (token: string): StudentsApi => {
  const api = new StudentsApi(configuration(token));
  return api;
};
