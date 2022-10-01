import { Text, ScrollView, ActivityIndicator, View } from "react-native";
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
import { Button, Image } from "@rneui/themed";
import OrderCard from "../components/OrderCard";

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
    <ScrollView style={{ backgroundColor: "#EB6A7C" }}>
      <StatusBar style="auto" />
      <Image
        source={{ uri: "https://links.papareact.com/m51" }}
        containerStyle={tailwind("w-full h-64")}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View>
        <Button
          onPress={() => setAscending(!ascending)}
          color="pink"
          titleStyle={{ color: "gray", fontWeight: "400" }}
          style={tailwind("py-2 px-5")}
        >
          Showing: {ascending ? "Oldest" : "Most Recent"} First
        </Button>
        {orders
          ?.sort((a, b) => {
            if (ascending) {
              return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
            } else {
              return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
            }
          })
          .map((order) => (
            <OrderCard key={order.trackingId} order={order} />
          ))}
      </View>
    </ScrollView>
  );
};

export default OrdersScreen;
