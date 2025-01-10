import {IError} from './types';

export class AppError extends Error implements IError {
  readonly ref: string;
  readonly parent: string;
  readonly operation: string;
  readonly details?: any;

  get headline() {
    return `Operation "${this.operation}" failed`;
  }

  static generateRef() {
    let ref = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < 3; i++)
      ref += possible.charAt(Math.floor(Math.random() * possible.length));

    for (let i = 0; i < 3; i++) ref += Math.floor(Math.random() * 9);

    return ref;
  }

  constructor(parent: string, operation: string, details?: any) {
    super(`${details}`);
    this.operation = operation;
    this.details = details;
    this.parent = parent;
    this.ref = AppError.generateRef();
  }
}

export const retryOperation = async (
  operationName,
  operation,
  maxRetries = 3,
  delay = 1000,
) => {
  let attempts = 0;
  while (attempts < maxRetries) {
    try {
      // console.log(
      //   `Attempt for ${operationName} -- ${attempts + 1} of ${maxRetries}`,
      // );
      return await operation(); // Call the operation
    } catch (error) {
      attempts++;
      // console.error(`Attempt ${attempts} failed with error:`, error);

      if (attempts >= maxRetries) {
        throw error; // If max retries reached, throw the error
      }
      await new Promise(resolve => setTimeout(resolve, delay)); // Wait before retrying
    }
  }
};
