import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { store } from '@/store/store';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const state = store.getState();
        const token = state.auth.token;
        
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add timestamp to prevent caching
        if (config.method === 'get') {
          config.params = {
            ...config.params,
            _t: Date.now(),
          };
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            // Attempt to refresh token
            const response = await this.refreshToken();
            const { token } = response.data;
            
            // Update token in store
            store.dispatch({ type: 'auth/setToken', payload: token });
            
            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return this.client(originalRequest);
          } catch (refreshError) {
            // Refresh failed, redirect to login
            store.dispatch({ type: 'auth/clearAuth' });
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private async refreshToken(): Promise<AxiosResponse> {
    return this.client.post('/auth/refresh');
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

export const apiClient = new ApiClient();

// Specific API functions
export const contentApi = {
  getContent: async (params: {
    page: number;
    categories: string[];
    query?: string;
  }) => {
    return apiClient.get('/content', { params });
  },

  getContentById: async (id: string) => {
    return apiClient.get(`/content/${id}`);
  },

  searchContent: async (query: string) => {
    return apiClient.get('/content/search', { params: { q: query } });
  },
};

export const userApi = {
  getProfile: async () => {
    return apiClient.get('/user/profile');
  },

  updateProfile: async (data: any) => {
    return apiClient.put('/user/profile', data);
  },

  updatePreferences: async (preferences: any) => {
    return apiClient.patch('/user/preferences', preferences);
  },
};

export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    return apiClient.post('/auth/login', credentials);
  },

  logout: async () => {
    return apiClient.post('/auth/logout');
  },

  register: async (data: { email: string; password: string; name: string }) => {
    return apiClient.post('/auth/register', data);
  },

  forgotPassword: async (email: string) => {
    return apiClient.post('/auth/forgot-password', { email });
  },

  resetPassword: async (token: string, password: string) => {
    return apiClient.post('/auth/reset-password', { token, password });
  },
};