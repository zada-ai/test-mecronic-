declare module 'bcrypt' {
  /**
   * Hash a string with a given salt or rounds.
   */
  export function hash(data: string, saltOrRounds: string | number): Promise<string>;

  /**
   * Compare a plain string to a hashed string.
   */
  export function compare(data: string, encrypted: string): Promise<boolean>;

  const bcrypt: {
    hash: typeof hash;
    compare: typeof compare;
  };

  export default bcrypt;
}
