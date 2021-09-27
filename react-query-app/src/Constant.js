export const APP_INFO = {
  name: "React-Query-Demo",
  version: "0.0.1",
  since: "2021",
  description: "react-query-demo",
  contactUrl: "https://site1.thanapoom.cc",
};

export const VERSION_CHECKER = {
  ENABLE_VERSION_CHECKER: false,
  CHECKVERSION_EVERY_MINUTE: 10,
  VERSIONCHECK_URL:
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? "https://api.thanapoom.cc/api/ClientVersion/GetLastClientVersion" //dev
      : "https://api.thanapoom.cc/api/ClientVersion/GetLastClientVersion", // Production
};

//update token in 10 - 30 minutes (random to avoid multipages call api in the same time )
export const RENEW_TOKEN_MS = {
  min: 1000 * 60 * 10,
  max: 1000 * 60 * 30,
};

export const API_URL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "https://demo3.devsiamsmile.com/api" //dev
    : "https://demo3.devsiamsmile.com/api"; // Production

export const ROLES = {
  user: "User",
  Manager: "Manager",
  admin: "Admin",
  developer: "Developer",
};
