import { TouchableOpacity, Text, View } from "react-native";
import React from "react";
import useCustomerOrders from "../hooks/useCustomerOrders";
import { useTailwind } from "tailwind-rn/dist";
import { useNavigation } from "@react-navigation/native";
import { CustomerScreenNavigationProps } from "../screens/CustomerScreen";
import { Card, Icon } from "@rneui/themed";

const CustomerCard = ({
  email,
  name,
  userId,
}: {
  name: string;
  email: string;
  userId: string;
}) => {
  const { orders, loading, error } = useCustomerOrders(userId);
  const tailwind = useTailwind();
  const navigation = useNavigation<CustomerScreenNavigationProps>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("MyModal", { name, userId })}
    >
      <Card containerStyle={tailwind("p-5 rounded-lg")}>
        <View>
          <View style={tailwind("flex-row justify-between")}>
            <View>
              <Text style={tailwind("text-2xl font-bold")}>{name}</Text>
              <Text style={[tailwind("text-sm"), { color: "#59C1CC" }]}>
                ID: {userId}
              </Text>
            </View>
            <View style={tailwind("flex-row items-center justify-end")}>
              <Text style={tailwind("text-[#59C1CC]")}>
                {loading ? "..." : `${orders.length}x`}
              </Text>
              <Icon
                style={tailwind("mb-5 ml-auto")}
                name="box"
                type="entypo"
                color="#59C1CC"
                size={50}
              />
            </View>
          </View>
        </View>
        <Card.Divider />
        <Text style={tailwind("")}>{email}</Text>
      </Card>
    </TouchableOpacity>
  );
};

export default CustomerCard;
