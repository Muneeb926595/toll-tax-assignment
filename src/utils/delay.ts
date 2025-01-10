export const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const startPolling = (
  fetchFunction,
  onSuccess,
  interval = 10000,
  onError = null,
) => {
  // Fetch immediately before starting the interval
  fetchFunction?.(true)
    ?.then?.(onSuccess)
    .catch(error => {
      if (onError) onError(error);
      console.error('Initial fetch error:', error);
    });

  // Start polling at the specified interval
  const intervalId = setInterval(() => {
    fetchFunction?.(false)
      ?.then?.(onSuccess)
      .catch(error => {
        if (onError) onError(error);
        console.error('Polling error:', error);
      });
  }, interval);

  // Return a function to stop polling
  return () => clearInterval(intervalId);
};
