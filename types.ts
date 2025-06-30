export interface NavLinkItem {
  path: string;
  name: string;
  icon: any;
}

export interface StatCardData {
  title: string;
  value: string;
  description: string;
  borderColor: string;
}

export interface BarChartData {
  name: string;
  "تغییرات ماهانه": number;
}

export interface PieChartData {
  name: string;
  value: number;
}

// --- API Utility Functions ---

const API_BASE_URL = "http://94.183.93.219:5488/api/Crm";

export const getToken = (): string | null => {
  return localStorage.getItem("authToken");
};

export const setToken = (token: string): void => {
  localStorage.setItem("authToken", token);
};

export const clearToken = (): void => {
  localStorage.removeItem("authToken");
};

const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["token"] = token;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (response.status === 204) {
      return null;
    }

    // The server might return a JSON response with a text/plain content-type header.
    // To handle this, we read the response as text and then parse it as JSON.
    const responseText = await response.text();

    // It's possible for a successful response to have an empty body.
    if (!responseText) {
      if (response.ok) {
        return null;
      }
      // If not ok and no body, throw with status.
      throw new Error(`Request failed with status ${response.status}`);
    }

    const responseData = JSON.parse(responseText);

    if (!response.ok) {
      console.error("API Error:", responseData);
      throw new Error(
        responseData.message || `Request failed with status ${response.status}`
      );
    }

    if (responseData.success === false) {
      throw new Error(responseData.message);
    }

    // The API wraps successful responses in a 'results' object
    return responseData.results !== undefined
      ? responseData.results
      : responseData;
  } catch (error) {
    console.error(`API call to ${endpoint} failed:`, error);
    throw error;
  }
};

// --- API Endpoint Functions ---

// CRM
export const login = (credentials: { username: string; password: string }) =>
  apiFetch("/Crm/login", {
    method: "POST",
    headers: {
      // Attempt to bypass CORS preflight by sending as a 'simple request'.
      "Content-Type": "text/plain;charset=UTF-8",
    },
    body: JSON.stringify(credentials),
  });

export const getDashboardData = () =>
  apiFetch("/Crm/dashboard", { method: "GET" });

export const getCustomerInfo = () =>
  apiFetch("/Crm/get-info-customer", { method: "GET" });

export const getPurchases = (page_number = 1) =>
  apiFetch(`/Crm/Quotations?page_number=${page_number}`, { method: "GET" });

export const getAccountStatement = (page_number = 1) =>
  apiFetch(`/Crm/Bill?page_number=${page_number}`, { method: "GET" });

// GENERAL
export const logout = () => apiFetch("/General/logout", { method: "DELETE" });

// --- Error Handling ---

export const getApiErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    if (error.message.includes("Failed to fetch")) {
      return "اتصال به سرور برقرار نشد. لطفاً از روشن بودن سرور و در دسترس بودن آن اطمینان حاصل کنید. این مشکل می‌تواند به دلیل خاموش بودن سرور یا خطای CORS باشد.";
    }
    return error.message;
  }
  return "یک خطای ناشناخته رخ داده است.";
};
