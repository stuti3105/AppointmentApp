import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function row({ slot, details }) {
  let status = details.available ? "NotBooked" : "Booked";

  return (
    <View style={style["row"]}>
      <View style={style["container"]}>
        <Text style={style["title"]}>{slot}</Text>
        <Text style={style["title"]}>{status}</Text>
      </View>
      {!details.available && (
        <View style={style["content"]}>
          <Text style={style['detail']}>
            Details :-
          </Text>
          <Text style={style["title"]}>Name: {details.name}</Text>
          <Text style={style["title"]}>Mobile No. : {details.mobile}-</Text>
          <Text style={style["title"]}>Email: {details.email}</Text>
        </View>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  row: { margin: 5 },
  detail: { fontSize: 15, color: "#ffff", marginBottom: 10 },
  container: {
    marginHorizontal: 10,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#808080",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "#9a9a9a",
  },
  title: { fontSize: 25, color: "#ffff" },
});
