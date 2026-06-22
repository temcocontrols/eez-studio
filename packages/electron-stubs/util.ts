export function promisify(fn: any) {
  return (...args: any[]) =>
    new Promise((resolve, reject) =>
      fn(...args, (err: any, result: any) =>
        err ? reject(err) : resolve(result)
      )
    );
}

export default { promisify };
