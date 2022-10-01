import React from "react";
import { useTailwind } from "tailwind-rn/dist";
import { Card, Divider, Icon } from "@rneui/themed";
import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const DeliveryCard = ({
  order,
  fullWidth,
}: {
  order: Order;
  fullWidth?: boolean;
}) => {
  const tailwind = useTailwind();

  return (
    <Card
      containerStyle={[
        tailwind(
          `${
            fullWidth
              ? "rounded-none m-0 bg-[#EB6A7C]"
              : "rounded-lg bg-[#59C1CC]"
          } my-2 p-[0px] pt-[16px]`
        ),
        {
          shadowColor: "black",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
      ]}
    >
      <View style={fullWidth && { width: "100%" }}>
        <Icon name="box" type="entypo" size={50} color="white" />
        <View style={tailwind("items-start p-5 -mt-3")}>
          <View style={tailwind("mx-auto")}>
            <Text
              style={tailwind(
                "text-xs text-center uppercase text-white font-bold"
              )}
            >
              {order.carrier} - {order.trackingId}
            </Text>
            <Text style={tailwind("text-white text-center text-lg font-bold")}>
              Expected Delivery:{" "}
              {new Date(order.createdAt).toLocaleDateString()}
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
        </View>
        <Divider color="white" />
        <View style={tailwind("p-5")}>
          {order.trackingItems.items.map((trackingItem) => (
            <View
              style={tailwind("flex-row justify-between items-center")}
              key={trackingItem.item_id}
            >
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
          style={[
            tailwind("w-full"),
            { flexGrow: 1 },
            !fullWidth && { height: 200 },
          ]}
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
      </View>
    </Card>
  );
};

export default DeliveryCard;
