import { StyleSheet } from "react-native";

export default StyleSheet.create({
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: "center"
  },
  productName: {
    fontWeight: "300",
    color: "black",
    flexShrink: 1,
    fontSize: 14.6
  },
  productCategory: {
    color: "gray",
    flexShrink: 1,
    marginVertical: 1.6,
    fontSize: 14.0
  },
  productPrice: {
    color: "black",
    flexShrink: 1,
    fontSize: 13.0
  },
  productOldPrice: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    color: "#1F2124",
    flexShrink: 1,
    marginLeft: 5,
    fontSize: 13.0
  },
  priceContainer: {
    flexDirection: "row"
  },
  detailsContainer: {
    flexGrow: 1,
    marginVertical: 4,
    marginHorizontal: 11.4,
    flexDirection: "column"
  },
  starButton: {
    height: 15,
    width: 15
  },
  cartButton: {
    marginTop: 12,
    height: 18,
    width: 18
  },
  buttonsContainer: {
    flexDirection: "column",
    alignItems: "center"
  },
  cellRow: {
    height: 72,
    flexDirection: "row",
    paddingLeft: 10,
    paddingEnd: 20.8,
    alignItems: "center",
    borderWidth: 0.19,
    borderColor: "#DDD"
  },
  soldOutText: {
    color: "white",
    transform: [{ rotate: "315deg" }],
    flexShrink: 1,
    fontSize: 13.0,
    textAlign: "center",
    fontWeight: "600"
  }
});
