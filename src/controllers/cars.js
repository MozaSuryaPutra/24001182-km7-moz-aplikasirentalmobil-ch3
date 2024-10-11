const carService = require("../services/cars");
const { successResponse } = require("../utils/response");
const CarsRepository = require("../repositories/cars");

exports.getCars = (req, res, next) => {
  const data = carService.getCars(req.query?.availableAt, req.query?.capacity);
  successResponse(res, data);
};

exports.getCarsById = (req, res, next) => {
  const { id } = req.params;
  const data = carService.getCarsById(id);
  successResponse(res, data, "Get Cars By Id is Success");
};

exports.createCars = async (req, res, next) => {
  const requestBody = {
    ...req.body,
    capacity: parseInt(req.body.capacity, 10),
    rentPerDay: parseInt(req.body.rentPerDay, 10),
    year: parseInt(req.body.year, 10),
    available: req.body.available.toLowerCase() === "true",
  };

  const data = await carService.createCars(requestBody, req.files);
  successResponse(res, data);
};

exports.updateCars = async (req, res, next) => {
  const { id } = req.params;
  const Cars = CarsRepository.getCarsById(id);
  const requestBody = {
    ...req.body,
    capacity: parseInt(req.body.capacity, 10) || Cars.capacity,
    rentPerDay: parseInt(req.body.rentPerDay, 10) || Cars.rentPerDay,
    year: parseInt(req.body.year, 10) || Cars.year,
    available:
      req.body.available !== undefined
        ? req.body.available.toLowerCase() === "true"
        : Cars.available,
  };
  const updateTheCars = await carService.updateCars(id, requestBody, req.files);
  successResponse(res, updateTheCars, "Update Student is Success");
};

exports.deleteCarsById = (req, res, next) => {
  const { id } = req.params;
  const deleteTheCars = carService.deleteCarsById(id);
  successResponse(res, deleteTheCars, "Delete Car is Success");
};
