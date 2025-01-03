export interface User {
  id: string;
  name: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}
