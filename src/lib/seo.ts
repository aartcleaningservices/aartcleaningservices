export const SITE_URL = "https://https://www.aartcleaning.my/";

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}