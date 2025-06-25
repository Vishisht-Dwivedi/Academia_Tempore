import {
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLString
} from "graphql";

export const SlotInputNestedType = new GraphQLInputObjectType({
    name: "SlotInputNested",
    fields: {
        slot: { type: new GraphQLNonNull(GraphQLInt) },
        subject: {
            type: new GraphQLNonNull(
                new GraphQLInputObjectType({
                    name: "SubjectInputNested",
                    fields: {
                        name: { type: new GraphQLNonNull(GraphQLString) },
                        code: { type: new GraphQLNonNull(GraphQLString) },
                        type: { type: new GraphQLNonNull(GraphQLString) }
                    }
                })
            )
        },
        teacher: {
            type: new GraphQLNonNull(
                new GraphQLInputObjectType({
                    name: "TeacherInputNested",
                    fields: {
                        name: { type: new GraphQLNonNull(GraphQLString) },
                        code: { type: new GraphQLNonNull(GraphQLString) }
                    }
                })
            )
        }
    }
});
