import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";

const App = () => {
  return (
    // @ts-ignore - TailwindProvider is missing Type Definition
    <TailwindProvider utilities={utilities}>
      <View>
        <StatusBar style="auto" />
      </View>
    </TailwindProvider>
  );
};

export default App;
