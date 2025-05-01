import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import axios from "axios";

    const typeDefs = `
        type Users{
            id: ID!
            name: String!
            username: String!
            email: String!
            phone: String!
            website: String!
        }
        type Todo {
            id: ID!
            title: String!
            completed: Boolean!
            user: Users
        }
        type Query {
            getTodos: [Todo]
            getAllUsers: [Users]
            getuser(id: ID!): Users
        }
    `;

    const BASE_URL = "https://jsonplaceholder.typicode.com";

    const fetchData = async (endpoint) => {
        const { data } = await axios.get(`${BASE_URL}/${endpoint}`);
        return data;
    };

    const resolvers = {
        Query: {
            getTodos: () => fetchData("todos"),
            getAllUsers: () => fetchData("users"),
            getuser: (parent, { id }) => fetchData(`users/${id}`),
        },
        Todo: {
            user: (todo) => fetchData(`users/${todo.userId}`),
        },
    };

    async function startServer() {
        const app = express();

        const server = new ApolloServer({
            typeDefs,
            resolvers,
        });

        await server.start();

        app.use(cors());
        app.use(express.json());

        app.use("/graphql",expressMiddleware(server));

        app.listen(4000, () => {
            console.log("🚀 GraphQL running at http://localhost:4000/graphql");
            console.log("🧪 Use Apollo Sandbox at https://studio.apollographql.com/sandbox");
        });
    }

startServer();
