import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect, useState } from "react";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { RootStackParamsList } from "../navigator/RootNavigator";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../navigator/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import { useTailwind } from "tailwind-rn/dist";
import useOrders from "../hooks/useOrders";

export type OrderScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Orders">,
  NativeStackNavigationProp<RootStackParamsList>
>;

const OrdersScreen = () => {
  const navigation = useNavigation<OrderScreenNavigationProp>();
  const tailwind = useTailwind();
  const { error, loading, orders } = useOrders();
  const [ascending, setAscending] = useState<boolean>(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarLabel: ({ color, focused }) => (
        <Text style={{ color: focused ? "#EB6A7C" : color, fontSize: 10 }}>
          Orders
        </Text>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <StatusBar style="auto" />
    </View>
  );
};

export default OrdersScreen;
