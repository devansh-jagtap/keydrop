const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://keydrop-1wzo.onrender.com";
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

type GoogleAuthState = {
  next?: string;
  cliToken?: string;
  nonce?: string;
};

type ClerkUserProfile = {
  email?: string | null;
  name?: string | null;
  avatarUrl?: string | null;
};

const GOOGLE_OAUTH_NONCE_KEY = "keydrop_google_oauth_nonce";

export async function apiRequest(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || `Request failed (${res.status})`);
  }

  return data;
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("keydrop_token");
}

export function saveToken(token: string) {
  localStorage.setItem("keydrop_token", token);
}

export function clearToken() {
  localStorage.removeItem("keydrop_token");
}

export async function login(email: string, password: string) {
  const data = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  saveToken(data.token);
  return data;
}

export async function register(email: string, password: string) {
  const data = await apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  saveToken(data.token);
  return data;
}

export async function createKeydropTokenFromClerk(clerkToken: string | null, profile: ClerkUserProfile = {}) {
  if (!clerkToken) {
    throw new Error("Missing Clerk token");
  }

  return apiRequest("/auth/clerk/token", {
    method: "POST",
    headers: { Authorization: `Bearer ${clerkToken}` },
    body: JSON.stringify({ profile }),
  });
}

export function getGoogleAuthUrl(state: GoogleAuthState = {}) {
  if (!GOOGLE_CLIENT_ID || typeof window === "undefined") {
    return null;
  }

  const redirectUri = `${window.location.origin}/auth/google/callback`;
  const nonce = crypto.randomUUID();
  sessionStorage.setItem(GOOGLE_OAUTH_NONCE_KEY, nonce);
  const encodedState = btoa(JSON.stringify({ ...state, nonce }));
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    prompt: "select_account",
    state: encodedState,
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export function parseGoogleAuthState(value: string | null): GoogleAuthState {
  if (!value) return {};

  try {
    return JSON.parse(atob(value)) as GoogleAuthState;
  } catch {
    return {};
  }
}

export function hasValidGoogleAuthState(state: GoogleAuthState) {
  if (typeof window === "undefined" || !state.nonce) {
    return false;
  }

  const expectedNonce = sessionStorage.getItem(GOOGLE_OAUTH_NONCE_KEY);
  sessionStorage.removeItem(GOOGLE_OAUTH_NONCE_KEY);
  return state.nonce === expectedNonce;
}

export async function loginWithGoogle(code: string, redirectUri: string) {
  const data = await apiRequest("/auth/google", {
    method: "POST",
    body: JSON.stringify({ code, redirectUri }),
  });
  saveToken(data.token);
  return data;
}

export async function getProjects(token?: string | null) {
  const authToken = token || getToken();
  if (!authToken) {
    throw new Error("Missing authentication token");
  }

  return apiRequest("/projects", {
    headers: { Authorization: `Bearer ${authToken}` },
  });
}

export async function getSecrets(projectKey: string) {
  return apiRequest("/secrets", {
    headers: { Authorization: `Bearer ${projectKey}` },
  });
}

export async function deleteProject(projectKey: string, token?: string | null) {
  const authToken = token || getToken();
  if (!authToken) {
    throw new Error("Missing authentication token");
  }

  return apiRequest(`/project/${projectKey}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${authToken}` },
  });
}

export async function confirmCliToken(token: string, jwt: string) {
  return apiRequest("/auth/cli/confirm", {
    method: "POST",
    body: JSON.stringify({ token, jwt }),
  });
}
