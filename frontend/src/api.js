const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const getToken = () => localStorage.getItem("token");
export const setToken = (token) => localStorage.setItem("token", token);
export const clearToken = () => localStorage.removeItem("token");

export async function api(path, { method = "GET", body, form } = {}) {
  const headers = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body) headers["Content-Type"] = "application/json";

  const res = await fetch(API_URL + path, {
    method,
    headers,
    body: form ? new URLSearchParams(form) : body && JSON.stringify(body),
  });

  if (res.status === 401 && token) {
    clearToken();
    window.location.reload();
  }
  if (res.status === 204) return null;

  const data = await res.json();
  if (!res.ok) {
    const detail = Array.isArray(data.detail) ? data.detail[0].msg : data.detail;
    throw new Error(detail || "Request failed");
  }
  return data;
}

export const peso = (value) => `₱${Number(value).toFixed(2)}`;
