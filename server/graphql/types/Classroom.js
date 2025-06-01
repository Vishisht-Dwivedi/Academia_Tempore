import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLError } from "graphql";
export const ClassroomType = new GraphQLObjectType({
    room: { type: GraphQLString },

})