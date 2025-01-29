"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
async function fetchTflData() {
    try {
        const bikePointsFetchURL = "https://api.tfl.gov.uk/BikePoint";
        const bikeStationResponse = await (0, node_fetch_1.default)(bikePointsFetchURL);
        const bikeStationJson = (await bikeStationResponse.json());
        return bikeStationJson;
    }
    catch (error) {
        console.log(error);
        return;
    }
}
exports.default = fetchTflData;
