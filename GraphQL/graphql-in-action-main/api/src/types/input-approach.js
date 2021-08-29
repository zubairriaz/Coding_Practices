import {
	
	GraphQLInputObjectType,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} from "graphql";
import { ApproachDetailsCategory } from "./approach-details-category";
import { Approach } from "./approachType";
import { UserError } from "./user-error";

export const ApproachDetailInput = new GraphQLInputObjectType({
	name: "ApproachDetailInput",
	fields: () => ({
		content: { type: new GraphQLNonNull(GraphQLString) },
		category: { type: new GraphQLNonNull(ApproachDetailsCategory) },
		
	}),
});

export const ApproachPayload = new GraphQLObjectType({
	name: "ApproachPayload",
	fields: () => ({
		Approach: { type: Approach },
		errors: { type: new GraphQLNonNull(new GraphQLList(UserError)) },
	}),
});

export const ApproachInput = new GraphQLInputObjectType({
    name: 'ApproachInput',
    fields: () => ({
      content: { type: new GraphQLNonNull(GraphQLString) },
      detailList: {
        type: new GraphQLNonNull(
          new GraphQLList(new GraphQLNonNull(ApproachDetailInput)),
        ),
      },
    }),
  });