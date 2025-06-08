import { GraphQLError } from 'graphql';
import type { GraphQLErrorExtensions, GraphQLErrorOptions } from 'graphql';

export class FullError extends GraphQLError {
  declare extensions: GraphQLErrorExtensions & {
    code: string;
    status: number;
  };

  constructor(
    message: string,
    options: GraphQLErrorOptions = {
      extensions: {
        code: '000',
        status: 500,
      },
    },
  ) {
    super(message, options);
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     InternalError:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'InternalError'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '001'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           example: 'Internal error. Try again later'
 */
export class InternalError extends FullError {
  constructor() {
    super('Internal error. Try again later', {
      extensions: {
        code: '001',
        status: 500,
      },
    });
    this.name = 'InternalError';
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     UnregisteredControllerError:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'UnregisteredControllerError'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '002'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           example: 'Controllers with target ${target} were not registered !'
 */
export class UnregisteredControllerError extends FullError {
  constructor(target: string) {
    super(`Controllers with target ${target} were not registered !`, {
      extensions: {
        code: '002',
        status: 500,
      },
    });
    this.name = 'UnregisteredControllerError';
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     FourOhFour:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'FourOhFour'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '003'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           example: "Resource not found or is inaccessible for you"
 */
export class FourOhFour extends FullError {
  constructor() {
    super('Resource not found or is inaccessible for you', {
      extensions: {
        code: '003',
        status: 404,
      },
    });
    this.name = 'FourOhFour';
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     NoRepositoryControllerSpecified:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'NoRepositoryControllerSpecified'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '004'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           example: "No repository controller specified"
 */
export class NoRepositoryControllerSpecified extends FullError {
  constructor() {
    super('No repository controller specified', {
      extensions: {
        code: '004',
        status: 500,
      },
    });
    this.name = 'NoRepositoryControllerSpecified';
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     FourOhFour:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'InvalidConfigError'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '005'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           example: "Config file is missing, cannot be read or is malformed"
 */
export class InvalidConfigError extends FullError {
  constructor(message?: string) {
    super(message ?? 'Config file is missing, cannot be read or is malformed', {
      extensions: {
        code: '005',
        status: 500,
      },
    });
    this.name = 'InvalidConfigError';
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     MissingArgError:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'MissingArgError'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '006'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           pattern: "^Missing param: .+$"
 */
export class MissingArgError extends FullError {
  constructor(param: string) {
    super(`Missing param: ${param}`, {
      extensions: {
        code: '006',
        status: 400,
      },
    });
    this.name = 'MissingArgError';
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     IncorrectDataType:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'IncorrectDataType'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '007'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           example: 'Received request is not json type'
 */
export class IncorrectDataType extends FullError {
  constructor() {
    super('Received request is not json type', {
      extensions: {
        code: '007',
        status: 400,
      },
    });
    this.name = 'IncorrectDataType';
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     IncorrectDataType:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'UserAlreadyRegistered'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '008'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           example: 'User already registered'
 */
export class UserAlreadyRegistered extends FullError {
  constructor() {
    super('User already registered', {
      extensions: {
        code: '008',
        status: 400,
      },
    });
    this.name = 'UserAlreadyRegistered';
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     IncorrectDataType:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'NoUserRegistered'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '009'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           example: 'No user found'
 */
export class NoUserRegistered extends FullError {
  constructor() {
    super('No user found', {
      extensions: {
        code: '009',
        status: 404,
      },
    });
    this.name = 'NoUserRegistered';
  }
}
