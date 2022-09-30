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
    <View style={tailwind("mt-4")}>
      <TouchableOpacity
        style={tailwind("absolute right-5 top-5 z-10")}
        onPress={() => navigation.goBack()}
      >
        <Icon name="closecircle" type="antdesign" />
      </TouchableOpacity>
      <View>
        <View>
          <Text>{name}</Text>
          <Text>Deliveries</Text>
        </View>
      </View>
      <FlatList
        data={orders}
        keyExtractor={(order) => order.trackingId.toString()}
        renderItem={({ item: order }) => <DeliveryCard order={order} />}
      />
    </View>
  );
};

export default ModalScreen;
