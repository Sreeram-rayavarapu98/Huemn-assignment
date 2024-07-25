const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");

const OrganizationType = new GraphQLObjectType({
  name: "Organization",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    role: { type: GraphQLString },
    organizationId: { type: GraphQLID },
  }),
});

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

module.exports = { OrganizationType, UserType, TaskType };
