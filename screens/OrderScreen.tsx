import { View } from "react-native";
import React, { useLayoutEffect } from "react";
import { useTailwind } from "tailwind-rn/dist";
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RootStackParamsList } from "../navigator/RootNavigator";
import { TabStackParamList } from "../navigator/TabNavigator";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import DeliveryCard from "../components/DeliveryCard";

export type OrderScreenRouteProp = RouteProp<RootStackParamsList, "Order">;

export type OrderScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<RootStackParamsList, "Order">
>;

const OrderScreen = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation<OrderScreenNavigationProp>();
  const {
    params: { order },
  } = useRoute<OrderScreenRouteProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: order.trackingItems.customer.name,
      headerBackTitle: "Deliveries",
      headerTitleStyle: { color: "black" },
      headerTintColor: "#EB6A7C",
    });
  }, [navigation]);

  return (
    <View style={tailwind("-mt-2")}>
      <DeliveryCard order={order} fullWidth />
    </View>
  );
};

export default OrderScreen;
