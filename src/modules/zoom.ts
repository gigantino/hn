export const zoomLevels = ["90", "100", "110", "125"] as const;

export const defaultZoom = "100";

export default function validateZoom(value: string | undefined): string {
  return value && (zoomLevels as readonly string[]).includes(value)
    ? value
    : defaultZoom;
}
