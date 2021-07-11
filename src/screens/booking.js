import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

import { Button, Surface, Snackbar, Portal } from "react-native-paper";
import ModalDropdown from "react-native-modal-dropdown";
import ValidationComponent from "react-native-form-validator";
import { Banner } from "react-native-paper";

import Store from "../storage";

export default class Booking extends ValidationComponent {
  state = {
    name: "",
    email: "",
    mobile: "",
    showBanner: false,
    showSnackbar: false,
    day: 0,
    time: "",
    availableSlots: null,
    availableDays: null,
    snackMessage: "",
  };

  async componentDidMount() {
    let availableSlots = await Store.getAvailableSlots();
    let availableDays = await Store.getAvailableDays();

    availableDays = availableDays.sort();

    this.setState({ availableSlots, availableDays });
  }

  getAvailableSlots = () => {
    let { availableSlots, availableDays, day } = this.state;

    if (!availableSlots) return [];

    availableSlots = availableSlots[availableDays[day]];

    let sortedSlots = Object.keys(availableSlots).sort(
      (a, b) => availableSlots[a].key - availableSlots[b].key
    );

    return sortedSlots;
  };

  onBooking = () => {
    let { availableDays, day, time, name, email, mobile } = this.state;

    this.validate({
      name: { minlength: 3, required: true },
      email: { email: true, required: true },
      mobile: { numbers: true, required: true },
      slots: { required: true },
    });

    if (!this.isFormValid()) this.setState({ showBanner: true });
    else if (!time) {
      this.setState({
        showSnackbar: true,
        snackMessage: " Please select available slot",
      });
    } else {
      Store.setAppointment(availableDays[day], time, {
        name,
        email,
        mobile,
      }).then(() => {
        this.setState({
          showSnackbar: true,
          snackMessage: "Your appointment has been booked successfully",
        });
        this.props.navigation.pop();
      });
    }
  };

  render() {
    return (
      <View style={style["container"]}>
        <Surface style={style["content"]}>
          <View style={style["fieldSet"]}>
            <Banner
              style={style['banner']}
              visible={this.state.showBanner}
              actions={[
                {
                  label: "Got it",
                  onPress: () => this.setState({ showBanner: false }),
                },
              ]}
            >
              {this.getErrorMessages()}
            </Banner>
            <Text style={style["title"]}>UserName</Text>
            <TextInput
              ref="name"
              style={style["field"]}
              placeholder="Name"
              onChangeText={(name) => this.setState({ name })}
            />
          </View>
          <View style={style["fieldSet"]}>
            <Text style={style["title"]}>Email</Text>
            <TextInput
              ref="email"
              style={style["field"]}
              placeholder="Email"
              onChangeText={(email) => this.setState({ email })}
            />
          </View>
          <View style={style["fieldSet"]}>
            <Text style={style["title"]}>Mobile No.</Text>
            <TextInput
              ref="mobile"
              style={style["field"]}
              placeholder="Mobile No."
              onChangeText={(mobile) => this.setState({ mobile })}
            />
          </View>
          <View style={style["selector"]}>
            <View>
              <Text style={style["title"]}>Select Date</Text>
              <ModalDropdown
                defaultValue={"Today"}
                options={["Today", "Tomorrow", "Day after tomorrow"]}
                defaultTextStyle={{ fontSize: 20, color: "#ffff" }}
                textStyle={{ fontSize: 20 }}
                dropdownTextStyle={style["modalText"]}
                dropdownStyle={style["modal"]}
                style={style["dropDown"]}
                onSelect={(option) => {
                  this.setState({ day: option });
                }}
              />
            </View>
            <View>
              <Text style={style["title"]}>Select Time</Text>
              <ModalDropdown
                defaultValue={"Available Slots"}
                options={this.getAvailableSlots()}
                defaultTextStyle={{ fontSize: 20, color: "#ffff" }}
                textStyle={{ fontSize: 20 }}
                style={style["dropDown"]}
                dropdownStyle={style["modal"]}
                dropdownTextStyle={style["modalText"]}
                onSelect={(option, item) => {
                  this.setState({ time: item });
                }}
              />
            </View>
          </View>
        </Surface>
        <Button
          mode="contained"
          color="#e5e5e5"
          onPress={this.onBooking}
          style={style["button"]}
        >
          {"Book Appointment"}
        </Button>
        <Portal>
          <Snackbar
            onDismiss={() => this.setState({ showSnackbar: false })}
            visible={this.state.showSnackbar}
            action={{
              label: "OK",
            }}
          >
            {this.state.snackMessage}
          </Snackbar>
        </Portal>
      </View>
    );
  }
}

let style = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#808080" },
  content: {
    justifyContent: "space-evenly",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#333333",
  },
  fieldSet: { margin: 20 },
  field: {
    height: 50,
    color: "#ffff",
    backgroundColor: "#727272",
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
    fontSize: 20,
  },
  title: { fontSize: 17, color: "#ffff" },
  button: {
    width: 200,
    alignSelf: "center",
    marginTop: 50,
    borderRadius: 10,
  },
  selector: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  dropDown: {
    margin: 10,
    backgroundColor: "#727272",
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  banner:{ margin: 10 },
  modalText: {
    backgroundColor: "#4d4d4d",
    height: 50,
    width: 200,
    fontSize: 20,
    color: "#ffff",
  },
  modal: {
    backgroundColor: "#4d4d4d",
    borderWidth: 1,
  },
});
