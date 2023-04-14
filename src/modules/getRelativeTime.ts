const timeUnits: { unit: Intl.RelativeTimeFormatUnit; duration: number }[] = [
  { unit: "year", duration: 31536000000 },
  { unit: "month", duration: 2628000000 },
  { unit: "day", duration: 86400000 },
  { unit: "hour", duration: 3600000 },
  { unit: "minute", duration: 60000 },
  { unit: "second", duration: 1000 },
];

const getRelativeTime = (timestamp: number) => {
  const msElapsed = Date.now() - timestamp * 1000;
  const intlRelativeTimeFormat = new Intl.RelativeTimeFormat("en", { style: "long" });
  const timeUnit = timeUnits.find(({ duration }) => msElapsed >= duration);

  if (!timeUnit) return "just now";

  const { unit, duration } = timeUnit;
  const timeElapsed = Math.floor(msElapsed / duration);

  return intlRelativeTimeFormat.format(-timeElapsed, unit);
};

export default getRelativeTime;
