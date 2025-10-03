export function checkResponse(
  res: Response
): Promise<unknown> | Record<string, unknown> {
  if (typeof res === 'object' && res !== null && 'ok' in res) {
    if (!res.ok) {
      return Promise.reject(new Error('Failed to fetch data.'));
    } else {
      return res.json();
    }
  } else {
    return Promise.reject(new Error('Failed to fetch data.'));
  }
}
