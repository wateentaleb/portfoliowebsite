import Head from "next/head";
import styles from "../styles/Home.module.css";
import ContainerBlock from "../components/ContainerBlock";
import FavouriteProjects from "../components/FavouriteProjects";
import LatestCode from "../components/LatestCode";
import Hero from "../components/Hero";
import userData from "@constants/data";
import { setContext } from "@apollo/client/link/context";

import {
  ApolloClient,
  InMemoryCache,
  gql,
  createHttpLink,
} from "@apollo/client";
export default function Home({ repositories }) {
  // console.log("test", `${process.env.GITHUB_USERNAME}`);
  return (
    <ContainerBlock
      title="Wateen Taleb - Software Engineer"
      description="Portfolio Website"
    >
      <Hero />
      <FavouriteProjects />
      <LatestCode repositories={repositories} />
    </ContainerBlock>
  );
}

export const getStaticProps = async () => {
  const httpLink = createHttpLink({
    uri: "https://api.github.com/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      {
        user(login: "${process.env.GITHUB_USERNAME}") {
          repositories(last: 30) {
            totalCount
            nodes {
              name
              shortDescriptionHTML
              id
              url
              openGraphImageUrl
            }
          }
        }
      }
    `,
  });

  const { user } = data;
  // console.log("data", user);
  // const numberofitems = user.repositories.totalCount;
  const repositories = user.repositories.nodes;

  // console.log("repositories", repositories);

  return {
    props: { repositories },
    revalidate: 60,
  };
};
