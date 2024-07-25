const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");

const OrganizationType = new GraphQLObjectType({
  name: "Organization",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});

module.exports = OrganizationType;
