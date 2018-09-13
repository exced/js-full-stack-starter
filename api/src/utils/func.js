/**
 *
 * @flow
 */

//  TODO : Flow types
type AnyFunc = any => any;

export const pipe = (...fns: Array<AnyFunc>) => (x: any) =>
  fns.reduce((v, f) => f(v), x);

export const compose = (...fns: Array<AnyFunc>) => (x: any) =>
  fns.reduceRight((v, f) => f(v), x);
