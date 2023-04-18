const fetcher = async <T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> => {
  const res = await fetch(input, init);
  return res.json();
};

export default fetcher;
