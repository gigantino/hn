const timeUnits: { unit: Intl.RelativeTimeFormatUnit; short: string; duration: number }[] = [
  { unit: "year", short: "y", duration: 31536000000 },
  { unit: "month", short: "mo", duration: 2628000000 },
  { unit: "day", short: "d", duration: 86400000 },
  { unit: "hour", short: "h", duration: 3600000 },
  { unit: "minute", short: "m", duration: 60000 },
  { unit: "second", short: "s", duration: 1000 },
];

const getRelativeTime = (timestamp: number, short: boolean = false) => {
  const msElapsed = Date.now() - timestamp * 1000;
  const timeUnit = timeUnits.find(({ duration }) => msElapsed >= duration);

  if (!timeUnit) return short ? "now" : "just now";

  const { unit, short: shortUnit, duration } = timeUnit;
  const timeElapsed = Math.floor(msElapsed / duration);

  if (short) {
    return `${timeElapsed}${shortUnit}`;
  }

  const intlRelativeTimeFormat = new Intl.RelativeTimeFormat("en", { style: "long" });
  return intlRelativeTimeFormat.format(-timeElapsed, unit);
};

export default getRelativeTime;
