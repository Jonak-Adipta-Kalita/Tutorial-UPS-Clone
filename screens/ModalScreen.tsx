import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import React, { useLayoutEffect } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import DeliveryCard from "../components/DeliveryCard";
import useCustomerOrders from "../hooks/useCustomerOrders";
import { RootStackParamsList } from "../navigator/RootNavigator";
import { TabStackParamList } from "../navigator/TabNavigator";

export type ModalScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<RootStackParamsList, "MyModal">
>;

export type ModalScreenRouteProp = RouteProp<RootStackParamsList, "MyModal">;

const ModalScreen = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation<ModalScreenNavigationProp>();
  const {
    params: { name, userId },
  } = useRoute<ModalScreenRouteProp>();

  const { error, loading, orders } = useCustomerOrders(userId);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View>
      <TouchableOpacity
        style={tailwind("absolute right-5 top-5 z-10 mt-4")}
        onPress={() => navigation.goBack()}
      >
        <Icon name="closecircle" type="antdesign" />
      </TouchableOpacity>
      <View style={tailwind("mt-10")}>
        <View style={[tailwind("py-5 border-b"), { borderColor: "#59C1CC" }]}>
          <Text
            style={[
              tailwind("text-center text-xl font-bold"),
              { color: "#59C1CC" },
            ]}
          >
            {name}
          </Text>
          <Text style={tailwind("text-center italic text-sm")}>Deliveries</Text>
        </View>
      </View>
      <FlatList
        contentContainerStyle={tailwind("pb-[200px]")}
        data={orders}
        keyExtractor={(order) => order.trackingId.toString()}
        renderItem={({ item: order }) => <DeliveryCard order={order} />}
      />
    </View>
  );
};

export default ModalScreen;
