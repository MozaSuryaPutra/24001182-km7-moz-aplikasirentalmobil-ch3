const fs = require("fs");
const cars = require("../../data/cars.json");
const { v4: uuidv4 } = require("uuid");
exports.getCars = (availableAt, capacity) => {
  const searchedCars = cars.filter((cars) => {
    let result = true;

    if (!cars.available) {
      return false; //
    }

    if (availableAt) {
      const carAvailableDate = new Date(cars.availableAt)
        .toISOString()
        .substring(0, 10);
      const inputAvailableDate = new Date(availableAt)
        .toISOString()
        .substring(0, 10);

      const isFoundAvailableAt = carAvailableDate <= inputAvailableDate;
      result = result && isFoundAvailableAt;
    }

    if (capacity) {
      const isSameCapacity = cars.capacity <= Number(capacity);
      result = result && isSameCapacity;
    }

    return result;
  });
  return searchedCars;
};

exports.getCarsById = (id) => {
  const carsList = cars.find((cars) => cars.id == id);
  return carsList;
};

exports.createCars = (data) => {
  const newCars = {
    id: uuidv4(),
    ...data,
  };

  /* Add data to current array students */
  cars.push(newCars);

  // Save the latest data to json
  fs.writeFileSync("./data/cars.json", JSON.stringify(cars, null, 4), "utf-8");

  return newCars;
};

exports.updateCars = (id, data) => {
  const index = cars.findIndex((cars) => cars.id === id);

  if (index !== -1) {
    cars.splice(index, 1, {
      ...cars[index],
      ...data,
    });
  } else {
    //TODO
    return null;
  }
  // TODO: Update the json data
  fs.writeFileSync("./data/cars.json", JSON.stringify(cars, null, 4), "utf-8");
  return cars[index];
};

exports.deleteCarsById = (id) => {
  const carsIndex = cars.findIndex((cars) => cars.id == id);
  if (carsIndex < 0) {
    // If no index found
    // TODO: make a error class
    return null;
  }

  // If the index found
  const deletedCars = cars.splice(carsIndex, 1);

  // Update the json
  fs.writeFileSync("./data/cars.json", JSON.stringify(cars, null, 4), "utf-8");

  return deletedCars;
};
