const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    role: { type: GraphQLString },
    organizationId: { type: GraphQLID },
  }),
});

module.exports = UserType;
