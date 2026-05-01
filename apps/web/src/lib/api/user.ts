import apiClient from "./client";

export interface UserProfileUpdate {
  name?: string;
  email?: string;
  bio?: string;
  website?: string;
  location?: string;
  password?: string;
}

type Theme = {
  name: string;
  textColor: string;
  backgroundColor: string;
  primaryColor: string;
};

type Bios = {
  id: string;
  createdAt: string;
  avatar: string;
  content: string;
  isPublic: boolean;
  links: {
    id: string;
    url: string;
  };
  publicUrl: string;
  style: string;
  template: string;
  theme: Theme;
  title: string;
  updatedAt: string;
  userId: string;
  views: number;
};

export interface UserResponse {
  user: {
    bios: Bios[];
    email: string;
    id: string;
    name: string;
    plan: string;
    bio?: string;
    website?: string;
    location?: string;
  };
}

export const userApi = {
  getProfile: async () => {
    const { data } = await apiClient.get<UserResponse>("/auth/user");
    return data;
  },

  updateProfile: async (profileData: UserProfileUpdate) => {
    const { data } = await apiClient.put("/auth/user", profileData);
    return data;
  },
};
