/**
 *
 * @flow
 */

import { gql } from 'apollo-server';
import { SchemaDirectiveVisitor } from 'graphql-tools';
import { defaultFieldResolver, GraphQLString } from 'graphql';
import moment from 'moment';

export const typeDef = gql`
  directive @date(defaultFormat: String = "YYYY MM DD") on FIELD_DEFINITION
`;

export class SchemaDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: any) {
    const { resolve = defaultFieldResolver } = field;
    const { defaultFormat } = this.args;

    field.args.push({
      name: 'format',
      type: GraphQLString
    });

    field.resolve = async function(
      source,
      { format, ...otherArgs },
      context,
      info
    ) {
      const date = await resolve.call(this, source, otherArgs, context, info);
      return moment(date).format(format || defaultFormat);
    };

    field.type = GraphQLString;
  }
}
