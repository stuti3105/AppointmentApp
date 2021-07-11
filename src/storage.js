import AsyncStorage from "@react-native-async-storage/async-storage";
const initSlots = () => {
  let slots = {};
  let addSlots = [
    "9:00 am",
    "10:00 am",
    "11:00 am",
    "12:00 pm",
    "1:00 pm",
    "2:00 pm",
    "3:00 pm",
    "4:00 pm",
    "5:00 pm",
    "6:00 pm",
    "7:00 pm",
    "8:00 pm",
    "9:00 pm",
    "10:00 pm",
  ];

  addSlots.forEach((item, index) => {
    slots[item] = {
      available: true,
      email: "",
      name: "",
      mobile: "",
      key: index,
    };
  });
  return slots;
};

const allotDays = () => {
  let date = new Date();
  let today = date.toLocaleDateString();
  let tomorrow = new Date(date.getTime() + 86400000).toLocaleDateString();
  let dayAfter = new Date(date.getTime() + 86400000 * 2).toLocaleDateString();

  return { today, tomorrow, dayAfter };
};

const initStore = async () => {
  let { today, tomorrow, dayAfter } = allotDays();

  await AsyncStorage.setItem(today, JSON.stringify(initSlots()));
  await AsyncStorage.setItem(tomorrow, JSON.stringify(initSlots()));
  await AsyncStorage.setItem(dayAfter, JSON.stringify(initSlots()));
};

const fetchStore = async () => {
  let keys = await AsyncStorage.getAllKeys();
  let keysToClean = [...keys]
  if (!keys) return initStore();
  else {
    let { today, tomorrow, dayAfter } = allotDays();
    [today, tomorrow, dayAfter].forEach(async (item)=> {
      if(keys.includes(item))  {
        keysToClean.splice(keysToClean.indexOf(item), 1)
      }
      else {
          await AsyncStorage.setItem(item, JSON.stringify(initSlots()));
      }
    })
    
    await AsyncStorage.multiRemove(keysToClean);

  }
};

const getAvailableDays = async () => {
  let days = await AsyncStorage.getAllKeys();
  return days;
};

const getAllSlots = async () => {
  let promises = [];
  let availableSlots = {};

  let keys = await AsyncStorage.getAllKeys();

  keys.forEach((item) => {
    promises.push(
      AsyncStorage.getItem(item).then((slots) => {
        slots = JSON.parse(slots);
        let _slots = {};
        Object.keys(slots).forEach((item) => {
          _slots[item] = slots[item];
        });

        availableSlots[item] = _slots;
      })
    );
  });

  return Promise.all(promises).then(() => availableSlots);
};

const getAvailableSlots = async () => {
  let promises = [];
  let availableSlots = {};

  let keys = await AsyncStorage.getAllKeys();

  keys.forEach((item) => {
    promises.push(
      AsyncStorage.getItem(item).then((slots) => {
        slots = JSON.parse(slots);
        let _slots = {};
        Object.keys(slots).forEach((item) => {
          if (slots[item]["available"]) _slots[item] = slots[item];
        });

        availableSlots[item] = _slots;
      })
    );
  });

  return Promise.all(promises).then(() => availableSlots);
};

const setAppointment = async (day, time, details) => {
  let prevApp = await AsyncStorage.getItem(day);
  prevApp = JSON.parse(prevApp);

  prevApp[time] = {
    available: false,
    ...details,
  };

  await AsyncStorage.mergeItem(day, JSON.stringify(prevApp));

  return;
};

export default Store = {
  initStore,
  getAvailableSlots,
  getAvailableDays,
  setAppointment,
  getAllSlots,
  fetchStore,
};
