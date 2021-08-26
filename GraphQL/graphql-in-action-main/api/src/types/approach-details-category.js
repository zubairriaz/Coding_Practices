import { GraphQLEnumType } from "graphql";

export const ApproachDetailsCategory = new GraphQLEnumType({
	name: "ApproachDetailCateogry",
	values: {
		NOTE: {},
		EXPLANATION: {},
		WARNING: {},
	},
});
