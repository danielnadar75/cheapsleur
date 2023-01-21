export const formatSecs = (secs: number) => {
  const d = secs * 1000;

  let seconds: any = Math.floor((d / 1000) % 60);
  let minutes: any = Math.floor((d / (1000 * 60)) % 60);

  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${seconds}`;
};
