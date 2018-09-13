/**
 *
 * @flow
 */

import { AuthenticationError, ForbiddenError } from 'apollo-server';

/**
 * Ensure that user exists
 */
export const auth = (user: Object | null) => (f: (Array<any>) => any) => (
  ...args: Array<any>
) => {
  if (!user) {
    throw new AuthenticationError('Access denied');
  }
  return f(...args);
};

/**
 * Ensure that user exists and has role in given allowed roles
 */
export const allowRoles = (user: Object | null, roles: Array<string>) => (
  f: (Array<any>) => any
) => (...args: Array<any>) => {
  if (!user || !user.role || !roles.includes(user.role)) {
    throw new AuthenticationError('Access denied');
  }
  return f(...args);
};
