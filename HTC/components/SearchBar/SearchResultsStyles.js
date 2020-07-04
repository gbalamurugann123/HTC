const React = require("react-native");
const { Dimensions, StyleSheet } = React;

module.exports = StyleSheet.create({
  searchResultsContainer: {
    width: Dimensions.get("window").width - 20,
    alignItems: "center",
    flex: 9,
  },
  imageView: {
    width: "50%",
    height: 100,
    margin: 7,
    borderRadius: 7,
  },

  textView: {
    width: "50%",
    textAlignVertical: "center",
    padding: 10,
    color: "#000",
  },
  separator: {
    height: 0.5,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
});