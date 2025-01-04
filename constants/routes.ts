export const API_USER_URLS = {
  TASK: "/task",
};

export const API_ADMIN_URLS = {
  ADMIN_GRAMMAR_RULE: "/admin/grammar-rule",
  ADMIN_TASK: "/admin/task",
};

export const FRONT_END_USER_URLS = {
  ADMIN: "/admin",
  DASHBOARD: "/dashboard",
  TEST: "/test",
  TEST_CREATION: "/test-creation",
};

export const FRONT_END_ADMIN_URLS = {
  ADMIN: "/admin",
};

export const frontendUserUrlsArray = Object.values(FRONT_END_USER_URLS);
export const frontendAdminUrlsArray = Object.values(FRONT_END_ADMIN_URLS);

export const apiUserUrlsArray = Object.values(API_USER_URLS);
export const apiAdminUrlsArray = Object.values(API_ADMIN_URLS);
