export type UserRole = 
  | 'Founder / Entrepreneur'
  | 'Researcher'
  | 'Ayurveda Practitioner'
  | 'IP Professional'
  | 'Regulatory Professional'
  | 'Student / Academic'
  | 'Other';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  organization: string;
  role: UserRole | string;
  createdAt: string;
  rememberMe?: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupData {
  name: string;
  email: string;
  organization: string;
  role: UserRole | string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: AuthUser;
}

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthResult>;
  signup: (data: SignupData) => Promise<AuthResult>;
  logout: () => void;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  updateProfile: (profile: Partial<AuthUser>) => Promise<AuthResult>;
}
