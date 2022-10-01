import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Card, Icon } from "@rneui/themed";
import { useTailwind } from "tailwind-rn/dist";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../navigator/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigator/RootNavigator";

export type OrdersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Orders">,
  NativeStackNavigationProp<RootStackParamsList>
>;

const OrderCard = ({ order }: { order: Order }) => {
  const tailwind = useTailwind();
  const navigation = useNavigation<OrdersScreenNavigationProp>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Order", { order })}>
      <Card containerStyle={tailwind("px-5 rounded-lg")}>
        <View style={tailwind("flex-row justify-between items-center")}>
          <View>
            <Icon
              name="truck-delivery"
              type="material-community"
              color="#EB6A7C"
            />
            <Text style={{ fontSize: 10 }}>
              {new Date(order?.createdAt).toDateString()}
            </Text>
          </View>
          <View>
            <Text style={[tailwind("text-gray-400"), { fontSize: 10 }]}>
              {order?.carrier}-{order?.trackingId}
            </Text>
            <Text style={tailwind("text-gray-500 text-xl")}>
              {order?.trackingItems?.customer?.name}
            </Text>
          </View>
          <View style={tailwind("flex-row items-center")}>
            <Text style={[tailwind("text-sm"), { color: "#EB6A7C" }]}>
              {order?.trackingItems?.items?.length}x
            </Text>
            <Icon style={tailwind("ml-2")} name="box" type="feather" />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default OrderCard;
