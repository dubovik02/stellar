export default class BaseApi {
  getIngridients(url: string): Promise<unknown> {
    return this.parseResponse(
      fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );
  }

  parseResponse(resPromise: Promise<unknown>): Promise<unknown> {
    return resPromise.then((res) => {
      if (typeof res === 'object' && res !== null && 'ok' in res) {
        if (!res.ok) {
          return Promise.reject(new Error('Failed to fetch data.'));
        } else {
          return (res as Response).json();
        }
      } else {
        return Promise.reject(new Error('Failed to fetch data.'));
      }
    });
  }
}
