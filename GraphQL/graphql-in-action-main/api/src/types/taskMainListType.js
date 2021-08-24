import {
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} from "graphql";
import { Approach } from "./approachType";
import { Author } from "./userType";

export const Task = new GraphQLObjectType({
	name: "Task",
	description: "To get Task Infomration",
	fields: {
		id: {
			type: new GraphQLNonNull(GraphQLID),
		},
		createdAt: {
			type: new GraphQLNonNull(GraphQLString),
			resolve: (src) => src.createdAt.toISOString(),
		},
		tags: {
			type: new GraphQLList(new GraphQLNonNull(GraphQLString)),
			resolve: (src) => {
				return src.tags.split(",");
			},
		},
		content: {
			type: new GraphQLNonNull(GraphQLString),
		},
		approachCount: {
			type: new GraphQLNonNull(GraphQLInt),
		},
        author:{
            type:Author,
            resolve:(source, args, {loaders})=>{
                return loaders.users.load(source.userId)
            }
        },
        approach:{
            type:new GraphQLList(Approach),
            resolve:(source, args, {loaders})=>{
                return loaders.approaches.load(source.id)
            }
        }
	},
});
