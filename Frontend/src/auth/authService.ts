import { AuthUser, LoginCredentials, SignupData, AuthResult } from './types';

/**
 * AyurGuard Prototype Authentication Service
 * 
 * NOTE: This is a decoupled client-side authentication prototype using browser storage.
 * It simulates realistic latency and validates credentials locally.
 * In a production deployment, these methods will connect directly to the FastAPI / JWT / OAuth backend.
 */

const STORAGE_KEYS = {
  CURRENT_USER: 'ayurguard_auth_user_v1',
  REGISTERED_USERS: 'ayurguard_registered_users_v1',
};

// Default prototype demo account
export const DEMO_USER: AuthUser = {
  id: 'usr_demo_001',
  name: 'Demo Researcher',
  email: 'researcher@example.com',
  organization: 'AyurGuard Demo & Research Institute',
  role: 'Researcher',
  createdAt: '2026-01-15T08:00:00.000Z',
  rememberMe: true,
};

export const DEMO_PASSWORD = 'AyurGuard2026!';

interface StoredAccount {
  user: AuthUser;
  passwordHash: string; // Plain mock string for prototype simulation
}

class AuthService {
  private getStoredAccounts(): StoredAccount[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {
      // Fallback on corrupt JSON
    }
    // Seed with demo account
    const initial: StoredAccount[] = [
      {
        user: DEMO_USER,
        passwordHash: DEMO_PASSWORD,
      },
    ];
    this.saveStoredAccounts(initial);
    return initial;
  }

  private saveStoredAccounts(accounts: StoredAccount[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(accounts));
    } catch {
      // Ignore quota errors
    }
  }

  public getCurrentUser(): AuthUser | null {
    try {
      // Check session storage first if not remembered, then localStorage
      const sessionRaw = sessionStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (sessionRaw) {
        return JSON.parse(sessionRaw);
      }
      const localRaw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (localRaw) {
        return JSON.parse(localRaw);
      }
    } catch {
      // Fallback
    }
    return null;
  }

  private saveCurrentUser(user: AuthUser, rememberMe = true): void {
    const serialized = JSON.stringify(user);
    if (rememberMe) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, serialized);
      sessionStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    } else {
      sessionStorage.setItem(STORAGE_KEYS.CURRENT_USER, serialized);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }

  public async login(credentials: LoginCredentials): Promise<AuthResult> {
    // Simulate network latency (300ms)
    await new Promise((res) => setTimeout(res, 300));

    const email = credentials.email.trim().toLowerCase();
    const password = credentials.password;

    if (!email) {
      return { success: false, error: 'Email is required.' };
    }
    if (!password) {
      return { success: false, error: 'Password is required.' };
    }

    const accounts = this.getStoredAccounts();
    const matchedAccount = accounts.find(
      (acc) => acc.user.email.toLowerCase() === email
    );

    // Accept valid registered account or accept any password matching the demo user
    if (matchedAccount) {
      if (matchedAccount.passwordHash === password || (email === DEMO_USER.email && password.length >= 4)) {
        const user = { ...matchedAccount.user, rememberMe: !!credentials.rememberMe };
        this.saveCurrentUser(user, !!credentials.rememberMe);
        return { success: true, user };
      }
    }

    // Friendly demo allowance: if testing with demo user email and standard passwords
    if (email === DEMO_USER.email) {
      const user = { ...DEMO_USER, rememberMe: !!credentials.rememberMe };
      this.saveCurrentUser(user, !!credentials.rememberMe);
      return { success: true, user };
    }

    return { success: false, error: 'Email or password is incorrect.' };
  }

  public async signup(data: SignupData): Promise<AuthResult> {
    // Simulate network latency (350ms)
    await new Promise((res) => setTimeout(res, 350));

    const name = data.name.trim();
    const email = data.email.trim().toLowerCase();
    const organization = data.organization.trim();
    const role = data.role;
    const password = data.password;
    const confirmPassword = data.confirmPassword;
    const agreeToTerms = data.agreeToTerms;

    if (!name) {
      return { success: false, error: 'Full name is required.' };
    }
    if (!email) {
      return { success: false, error: 'Email address is required.' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (!password) {
      return { success: false, error: 'Password is required.' };
    }
    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }
    if (password !== confirmPassword) {
      return { success: false, error: 'Passwords do not match.' };
    }
    if (!agreeToTerms) {
      return { success: false, error: 'You must agree to the Terms of Use and Privacy Policy.' };
    }

    const accounts = this.getStoredAccounts();
    const existing = accounts.find((acc) => acc.user.email.toLowerCase() === email);
    if (existing) {
      return { success: false, error: 'An account with this email already exists. Please sign in.' };
    }

    const newUser: AuthUser = {
      id: `usr_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
      name,
      email,
      organization: organization || 'Independent Researcher',
      role: role || 'Researcher',
      createdAt: new Date().toISOString(),
      rememberMe: true,
    };

    accounts.push({
      user: newUser,
      passwordHash: password,
    });
    this.saveStoredAccounts(accounts);
    this.saveCurrentUser(newUser, true);

    return { success: true, user: newUser };
  }

  public logout(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      sessionStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    } catch {
      // Ignore
    }
  }

  public async resetPassword(email: string): Promise<{ success: boolean; message: string }> {
    await new Promise((res) => setTimeout(res, 300));
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) {
      return { success: false, message: 'Email address is required.' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      return { success: false, message: 'Please enter a valid email address.' };
    }

    return {
      success: true,
      message: 'This prototype does not send real email. In production, this action will connect to the authentication backend.',
    };
  }

  public async updateProfile(profile: Partial<AuthUser>): Promise<AuthResult> {
    const current = this.getCurrentUser();
    if (!current) {
      return { success: false, error: 'No active session.' };
    }

    const updated: AuthUser = {
      ...current,
      ...profile,
      id: current.id,
      email: profile.email ? profile.email.trim().toLowerCase() : current.email,
    };

    // Update in stored accounts too
    const accounts = this.getStoredAccounts();
    const index = accounts.findIndex((a) => a.user.id === current.id || a.user.email.toLowerCase() === current.email.toLowerCase());
    if (index >= 0) {
      accounts[index].user = updated;
      this.saveStoredAccounts(accounts);
    }

    this.saveCurrentUser(updated, current.rememberMe !== false);
    return { success: true, user: updated };
  }
}

export const authService = new AuthService();
