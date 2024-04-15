import { ApolloServer } from "apollo-server";
import { dataSource } from "./db";
import { buildSchema } from "type-graphql";
import { CountryResolver } from "../resolvers/countryResolver";
async function createServer(): Promise<ApolloServer> {
    const port: number = 3001;
    await dataSource.initialize();

    const schema = await buildSchema({
        resolvers: [
            CountryResolver,
        ],
        validate: { forbidUnknownValues: false }
    });

    return new ApolloServer({
        schema,
    });
}

export default createServer;
