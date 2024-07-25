require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const authMiddleware = require("./middleware/auth");
const tenantMiddleware = require("./middleware/tenant");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.use(authMiddleware);

app.use(tenantMiddleware);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Connection error", err.message);
  });
