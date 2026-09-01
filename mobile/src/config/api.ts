const defaultAndroidEmulatorUrl = 'http://10.0.2.2:8080';

export const API_URL = (
  process.env.EXPO_PUBLIC_API_URL?.trim() || defaultAndroidEmulatorUrl
).replace(/\/$/, '');
