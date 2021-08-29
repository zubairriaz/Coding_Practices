import {  GraphQLObjectType, GraphQLString } from "graphql";

export const UserError = new GraphQLObjectType({
    name:"UserError",
    fields:()=>({
        message:{type: GraphQLString}
    })
})

