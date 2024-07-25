const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");

const TaskType = new GraphQLObjectType({
  name: "Task",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    dueDate: { type: GraphQLString },
    userId: { type: GraphQLID },
    organizationId: { type: GraphQLID },
  }),
});

module.exports = TaskType;
