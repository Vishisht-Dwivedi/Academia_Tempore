import { GraphQLInputObjectType, GraphQLString, GraphQLList, GraphQLNonNull } from "graphql";

export const TeacherInputType = new GraphQLInputObjectType({
    name: "TeacherInput",
    fields: () => ({
        name: { type: new GraphQLNonNull(GraphQLString) },
        code: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        classes: { type: new GraphQLList(GraphQLString) },
        subjects: { type: new GraphQLList(GraphQLString) },
    }),
});
