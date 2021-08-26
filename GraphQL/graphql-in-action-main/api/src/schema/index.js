import { GraphQLSchema, printSchema } from "graphql";
import { Mutator } from "./mutator";

import { Query } from "./queries";

export const schema = new GraphQLSchema({
	query: Query,
	mutation: Mutator,
});

console.log(printSchema(schema));
