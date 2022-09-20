import React, { useLayoutEffect } from "react";
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
import { Image } from "@rneui/themed";

export type CustomerScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Customers">,
  NativeStackNavigationProp<RootStackParamsList>
>;

const CustomerScreen = () => {
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
    </ScrollView>
  );
};

export default CustomerScreen;
