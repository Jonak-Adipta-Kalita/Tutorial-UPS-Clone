import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigator/RootNavigator";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://alva.stepzen.net/api/unrealized-panther/__graphql",
  headers: {
    Authorization:
      "apikey alva::stepzen.net+1000::cf89b0154aaeb32e349777d7b2a014733f8f4a28cf2c66d5c85edfe2b9ce9eb6",
  },
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    // @ts-ignore - TailwindProvider is missing Type Definition
    <TailwindProvider utilities={utilities}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </TailwindProvider>
  );
};

export default App;
