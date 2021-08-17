class Promisify<T> {
  create = (fun: () => T): Promise<T> => (
    new Promise<T>((resolve) => resolve(fun()))
  );
}

export default Promisify;
