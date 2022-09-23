import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, ActivityIndicator } from "react-native";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { useTailwind } from "tailwind-rn";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../navigator/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import { RootStackParamsList } from "../navigator/RootNavigator";
import { Image, Input } from "@rneui/themed";

export type CustomerScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Customers">,
  NativeStackNavigationProp<RootStackParamsList>
>;

const CustomerScreen = () => {
  const [input, setInput] = useState<string>("");
  const tailwind = useTailwind();
  const navigation = useNavigation<CustomerScreenNavigationProps>();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <ScrollView style={{ backgroundColor: "#59C1CC" }}>
      <StatusBar style="auto" />
      <Image
        source={{ uri: "https://links.papareact.com/3jc" }}
        containerStyle={tailwind("w-full h-64")}
        PlaceholderContent={<ActivityIndicator />}
      />
      <Input
        placeholder="Search by Customer"
        value={input}
        onChangeText={setInput}
        containerStyle={tailwind("bg-white pt-5 pb-0 px-10")}
      />
    </ScrollView>
  );
};

export default CustomerScreen;
