import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";

import Store from "../storage";
import Row from "../components/row";

export default function appointmentList() {
  const [data, setData] = useState(null);

  useEffect(() => {
    Store.getAllSlots().then((slots) => setData(slots));
  }, []);

  const renderSlots = () => {
    let children = [];
    let days = Object.keys(data).sort();

    for (let eachDay of days) {
      const renderDailySlots = () => {
        let grandChildren = [];
        let sortedSlots = Object.keys(data[eachDay]).sort(
          (a, b) => data[eachDay][a].key - data[eachDay][b].key
        );

        for (let slot of sortedSlots) {
          grandChildren.push(
            <Row
              key={eachDay + "/" + data[eachDay][slot].key}
              slot={slot}
              details={data[eachDay][slot]}
            />
          );
        }

        return grandChildren;
      };

      children.push(
        <View key={eachDay}>
          <Text style={style["title"]}>{new Date(eachDay).toDateString()}</Text>
          {renderDailySlots()}
        </View>
      );
    }

    return children;
  };

  return (
    <SafeAreaView style={style['container']}>
      <ScrollView style={style['screen']}>
        {data ? renderSlots() : <Text style={style["title"]}>Loading...</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}

let style = StyleSheet.create({
  container:{ flex: 1 },
  screen: { backgroundColor: "#cccccc" },
  title: { fontSize: 25, marginVertical: 10, alignSelf: "center" },
});
