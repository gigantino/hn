const formRedirect = (formData: FormData, fallback: string) => {
  const target = formData.get("redirect")?.toString();
  if (!target || !target.startsWith("/") || target.startsWith("//") || target.startsWith("/\\")) return fallback;
  return target;
};

export default formRedirect;
