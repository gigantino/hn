export const themes = ["system", "light", "dark"] as const;
export type Theme = (typeof themes)[number];
export const defaultTheme: Theme = "system";

const validateTheme = (theme: string | undefined): Theme =>
  themes.find((t) => t === theme) ?? defaultTheme;

export default validateTheme;
