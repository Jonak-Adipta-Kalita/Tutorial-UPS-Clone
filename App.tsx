import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigator/RootNavigator";

const App = () => {
  return (
    // @ts-ignore - TailwindProvider is missing Type Definition
    <TailwindProvider utilities={utilities}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </TailwindProvider>
  );
};

export default App;
