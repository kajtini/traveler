export const formatTimestamp = (timestamp: {
  seconds: number;
  nanoseconds: number;
}) => {
  const timestampMs =
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;

  // Returns number of milliseconds passed since Jan 1 1970
  const now = Date.now();

  const diffMs = now - timestampMs;

  const diffSeconds = Math.round(diffMs / 1000);

  if (diffSeconds < 60) {
    return `Just now`;
  } else if (diffSeconds >= 60 && diffSeconds < 3600) {
    return `${Math.round(diffSeconds / 60)} minutes ago`;
  } else if (diffSeconds >= 3600 && diffSeconds < 86400) {
    return `${Math.round(diffSeconds / 3600)} hours ago`;
  } else {
    return `${Math.round(diffSeconds / 86400)} days ago`;
  }
};
