import { gql } from "@apollo/client";

export const GetCustomers = gql`
  query GetCustomers {
    value {
      email
      name
    }
    name
  }
`;

export const GetOrders = gql`
  query GetOrders {
    getOrders {
      name
      value {
        Address
        City
        carrier
        createdAt
        lat
        lng
        shippingCost
        trackingId
        trackingItems {
          customer {
            email
            name
          }
          customer_id
          items {
            item_id
            name
            price
            quantity
          }
        }
      }
    }
  }
`;
