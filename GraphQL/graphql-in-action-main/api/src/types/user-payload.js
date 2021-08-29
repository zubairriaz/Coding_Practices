import {
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} from "graphql";
import { UserError } from "./user-error";

import { Author } from "./userType";

export const UserPayload = new GraphQLObjectType({
	name: "UserPayload",
	fields: () => ({
		errors: { type: new GraphQLNonNull(new GraphQLList(UserError)) },
		User: { type: Author },
		authtoken: { type: GraphQLString },
	}),
});
