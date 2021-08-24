import {
	GraphQLSchema,
    printSchema,
} from "graphql";

import { Query } from "./queries";



export const schema = new GraphQLSchema({
	query:Query
});

console.log(printSchema(schema));
