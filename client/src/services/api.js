// Central API client service

const getAdminHeaders = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return {
    "Content-Type": "application/json",
    "x-admin-auth": isAdmin ? "true" : "false",
  };
};

export const fetchColleges = async (params = {}) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val && val !== "All") {
      searchParams.append(key, val);
    }
  });

  const response = await fetch(`/api/colleges?${searchParams.toString()}`);
  return response.json();
};

export const fetchFilters = async () => {
  const response = await fetch("/api/colleges/filters");
  return response.json();
};

export const fetchCollegeDetails = async (code) => {
  const response = await fetch(`/api/colleges/${code}/details`);
  return response.json();
};

export const loginUser = async (usernameOrEmail, password) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ usernameOrEmail, password }),
  });
  return response.json();
};

export const registerUser = async (email, password) => {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const loginAdmin = async (username, password) => {
  const response = await fetch("/api/admin/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};

export const adminCreateCollege = async (collegeData) => {
  const response = await fetch("/api/admin/colleges", {
    method: "POST",
    headers: getAdminHeaders(),
    body: JSON.stringify(collegeData),
  });
  return response.json();
};

export const adminUpdateCollege = async (id, collegeData) => {
  const response = await fetch(`/api/admin/colleges/${id}`, {
    method: "POST", 
    method: "PUT",
    headers: getAdminHeaders(),
    body: JSON.stringify(collegeData),
  });
  return response.json();
};

export const adminDeleteCollege = async (id) => {
  const response = await fetch(`/api/admin/colleges/${id}`, {
    method: "DELETE",
    headers: getAdminHeaders(),
  });
  return response.json();
};

export const adminSearchColleges = async (query) => {
  const response = await fetch(`/api/admin/colleges/search?q=${encodeURIComponent(query)}`, {
    headers: getAdminHeaders(),
  });
  return response.json();
};
