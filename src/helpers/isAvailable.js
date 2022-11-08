export const isAvailable = (eventStart, availStart) => {
  if (availStart >= eventStart) return true;
  return false;
};
