const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");
const TaskType = require("./types/task");
const UserType = require("./types/user");
const Task = require("../models/task");
const User = require("../models/user");
const Organization = require("../models/organization");

const mutations = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        role: { type: GraphQLString },
        organizationId: { type: GraphQLID },
      },
      resolve: async (parent, args) => {
        const user = new User({
          username: args.username,
          password: await bcrypt.hash(args.password, 12),
          role: args.role,
          organizationId: args.organizationId,
        });
        return user.save();
      },
    },
    addTask: {
      type: TaskType,
      args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        dueDate: { type: GraphQLString },
        userId: { type: GraphQLID },
        organizationId: { type: GraphQLID },
      },
      resolve: (parent, args) => {
        const task = new Task({
          title: args.title,
          description: args.description,
          status: args.status,
          dueDate: args.dueDate,
          userId: args.userId,
          organizationId: args.organizationId,
        });
        return task.save();
      },
    },
  },
});

module.exports = mutations;
