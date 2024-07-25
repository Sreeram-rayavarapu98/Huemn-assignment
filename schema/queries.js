const { GraphQLObjectType, GraphQLList, GraphQLID } = require("graphql");
const TaskType = require("./types/task");
const UserType = require("./types/user");
const OrganizationType = require("./types/organization");
const Task = require("../models/task");
const User = require("../models/user");
const Organization = require("../models/organization");

const queries = new GraphQLObjectType({
  name: "Query",
  fields: {
    tasks: {
      type: new GraphQLList(TaskType),
      resolve: (parent, args) => {
        return Task.find();
      },
    },
    task: {
      type: TaskType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Task.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: (parent, args) => {
        return User.find();
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return User.findById(args.id);
      },
    },
    organizations: {
      type: new GraphQLList(OrganizationType),
      resolve: (parent, args) => {
        return Organization.find();
      },
    },
    organization: {
      type: OrganizationType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Organization.findById(args.id);
      },
    },
  },
});

module.exports = queries;
