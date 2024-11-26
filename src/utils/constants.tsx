export const URL_PAYMENT = {
  LOGIN: '/',
  HISTORY: '/history',
  PAYMENT: '/payment',
  PAYMENT_SUCCESS: '/payment-success',
};

const URL_ADMIN_PREFIX = '/admin';

export const URL_ADMIN = {
  LOGIN: `${URL_ADMIN_PREFIX}/login`,
  FORGOT_PASSWORD: `${URL_ADMIN_PREFIX}/forgot-password`,
  SHOP: `${URL_ADMIN_PREFIX}/saler`,
  CUSTOMER: `${URL_ADMIN_PREFIX}/customer`,
  PURCHASE_HISTORY: `${URL_ADMIN_PREFIX}/purchase-history`,
  SETTING: `${URL_ADMIN_PREFIX}/account-settings`,
  RESET_PASSWORD: `${URL_ADMIN_PREFIX}/reset-password`,
  RESET_PASSWORD_SUCC: `${URL_ADMIN_PREFIX}/reset-password-success`,
  CHANGE_PASSWORD: `${URL_ADMIN_PREFIX}/change-passwords`,
  CHANGE_EMAIL: `${URL_ADMIN_PREFIX}/change-email`,
  EMAIL_SUCCESS: `${URL_ADMIN_PREFIX}/email-success`,
};

export const ACTIVE = '0';
export const DEACTIVATE = '1';
export enum IS_LOADING {
  LOADED = -1,
  ALL_LOADED,
  LOADING,
}

export const PER_PAGE = 10;

export const SUCCESS_CODE = {
  TOKEN_SUCCESS: '000',
};

export const ERRORS_CODE = {
  E00007: 'E00007',
  E00024: 'E00024',
  E00005: 'E00005',
  E00028: 'E00028',
};

export const ERRORS = {
  [ERRORS_CODE.E00007]: 'Code is expired',
  [ERRORS_CODE.E00024]: 'Token expired',
};
