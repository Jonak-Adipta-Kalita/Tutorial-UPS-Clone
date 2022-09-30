import React from "react";
import { useTailwind } from "tailwind-rn/dist";
import { Card, Divider, Icon } from "@rneui/themed";
import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const DeliveryCard = ({ order }: { order: Order }) => {
  const tailwind = useTailwind();

  return (
    <Card
      containerStyle={[
        tailwind("rounded-lg my-2 p-[0px] pt-[16px] bg-[#59C1CC]"),
        {
          shadowColor: "black",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
      ]}
    >
      <View>
        <Icon name="box" type="entypo" size={50} color="white" />
        <View>
          <Text
            style={tailwind(
              "text-xs text-center uppercase text-white font-bold"
            )}
          >
            {order.carrier} - {order.trackingId}
          </Text>
          <Text style={tailwind("text-white text-center text-lg font-bold")}>
            Expected Delivery: {new Date(order.createdAt).toLocaleDateString()}
          </Text>
          <Divider color="white" />
        </View>
        <View style={tailwind("mx-auto mb-5")}>
          <Text
            style={tailwind("text-center text-white font-bold m-5 text-base")}
          >
            Address
          </Text>
          <Text style={tailwind("text-sm text-center text-white")}>
            {order.Address}, {order.City}
          </Text>
          <Text style={tailwind("text-sm text-center italic text-white")}>
            Shipping Cost: ${order.shippingCost}
          </Text>
        </View>
        <Divider color="white" />
      </View>
      <View style={tailwind("p-5")}>
        {order.trackingItems.items.map((trackingItem) => (
          <View style={tailwind("flex-row justify-between items-center")}>
            <Text style={tailwind("text-sm italic text-white")}>
              {trackingItem.name}
            </Text>
            <Text style={tailwind("text-white text-xl")}>
              x {trackingItem.quantity}
            </Text>
          </View>
        ))}
      </View>
      <MapView
        initialRegion={{
          latitude: order.Lat,
          longitude: order.Lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        style={tailwind("w-full h-[200px]")}
      >
        {order.Lat && order.Lng && (
          <Marker
            coordinate={{ latitude: order.Lat, longitude: order.Lng }}
            title="Delivery Location"
            description={order.Address}
            identifier="destination"
          />
        )}
      </MapView>
    </Card>
  );
};

export default DeliveryCard;
