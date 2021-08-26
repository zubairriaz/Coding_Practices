import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { ApproachDetailsCategory } from "./approach-details-category";

export const ApproachDetails = new GraphQLObjectType({
	name: "ApproachDetails",
	fields: () => ({
		content: {
			type: new GraphQLNonNull(GraphQLString),
		},
		category: {
			type: new GraphQLNonNull(ApproachDetailsCategory),
		},
	}),
});

