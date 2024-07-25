# Huemn-assignment
Interview assignment
Install Dependencies:
npm install 

start the server:
node server.js

Graphql queries and mutations:
Creating an organization:
mutation {
  createOrganization(name: "Org one", description: "First organization") {
    id
    name
    description
  }
}

get all organizations:
query {
  organizations {
    id
    name
    description
  }
}

Create a user:
mutation {
  createUser(username: "user4", password: "password4", role: "admin", organizationId: "ORG_ID") {
    id
    username
    role
    organizationId
  }
}

Get all users:
query {
  users {
    id
    username
    role
    organizationId
  }
}

Create a task:
mutation {
  createTask(title: "Task Four", description: "Fourth task description", status: "Open", dueDate: "2024-08-01T00:00:00.000Z", userId: "USER_ID", organizationId: "ORG_ID") {
    id
    title
    description
    status
    dueDate
    userId
    organizationId
  }
}

Get all tasks:
query {
  tasks {
    id
    title
    description
    status
    dueDate
    userId
    organizationId
  }
}

Update a task:
mutation {
  updateTask(id: "TASK_ID", title: "Updated Task Four", description: "Updated fourth task description", status: "Completed") {
    id
    title
    description
    status
    dueDate
    userId
    organizationId
  }
}

Delete a task:
mutation {
  deleteTask(id: "TASK_ID") {
    id
    title
  }
}

