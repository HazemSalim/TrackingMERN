export function trimText(str, count) {
  if (!str || str.length <= count) return str;

  return str.substr(0, count) + "...";
}

export function getNumberOfDays(startDate, endDate) {
  if (!startDate || !endDate) {
    return 0;
  }

  return endDate.diff(startDate, "days") + 1;
}

export function handleMessage(loading = false, error = false, noData = false) {
  if (error) {
    return "Something went wrong with backend.";
  }
  if (loading) {
    return "Loading...";
  }
  if (noData) {
    return "No Data Found.";
  }

  return "";
}
