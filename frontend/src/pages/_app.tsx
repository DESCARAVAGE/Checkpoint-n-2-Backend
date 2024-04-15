import Layout from "@/components/Layout";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";

const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
});

const client = new ApolloClient({
    cache: new InMemoryCache()
})

function App({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ApolloProvider>
    )
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });