const carRepository = require("../repositories/cars.js");
const { NotFoundError, InternalServerError } = require("../utils/request.js");
const { imageUpload } = require("../utils/image-kit.js");

exports.getCars = (availabeAt, capacity) => {
  const cars = carRepository.getCars(availabeAt, capacity);
  if (cars.length < 1) {
    throw new NotFoundError("Car Is Not Found");
  }
  return cars;
};

exports.getCarsById = (id) => {
  const carsId = carRepository.getCarsById(id);
  if (!carsId) {
    throw new NotFoundError("Cars is not found");
  }
  return carsId;
};

exports.createCars = async (data, file) => {
  // Upload file to image kit
  if (file?.image) {
    data.image = await imageUpload(file.image);
  }

  // Create the data
  return carRepository.createCars(data);
};

exports.updateCars = async (id, data, file) => {
  const Cars = carRepository.getCarsById(id);
  if (!Cars) {
    throw new NotFoundError("Cars is not found");
  }

  if (file?.image) {
    data.image = await imageUpload(file.image);
  } else {
    data.image = Cars.image;
  }

  const updatedCars = carRepository.updateCars(id, data);
  if (!updatedCars) {
    throw new InternalServerError(["Failed to update Cars!"]);
  }

  return updatedCars;
};

exports.deleteCarsById = (id) => {
  const carsExist = carRepository.getCarsById(id);
  if (!carsExist) {
    throw new NotFoundError("Cars is not found");
  }
  const deleteCars = carRepository.deleteCarsById(id);
  if (!deleteCars) {
    throw new InternalServerError("Failed to delete Cars");
  }
  return deleteCars;
};
