import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import Store from "../storage";

export default function home({ navigation }) {
  useEffect(() => {
    Store.fetchStore();
  }, []);

  return (
    <View style={style["container"]}>
      <Button
        mode="contained"
        color="#e5e5e5"
        style={style["button"]}
        onPress={() => navigation.navigate("Appointments")}
      >
        {"My Appointments"}
      </Button>
      <Button
        mode="contained"
        color="#e5e5e5"
        style={style["button"]}
        onPress={() => navigation.navigate("Booking")}
      >
        {"Book Appointment"}
      </Button>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#808080",
  },
  button: {
    width: 200,
    alignSelf: "center",
    marginTop: 30,
    borderRadius: 10,
  },
});
