"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRingById = exports.deleteRingById = exports.createRing = exports.getRingById = exports.getRings = exports.RingModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const RingSchema = new mongoose_1.default.Schema({
    ringname: { type: String, require: true },
    description: { type: String, require: true },
    carrier: { type: String, require: true },
    forgedby: { type: String, require: true },
    image: { type: String, require: true },
});
exports.RingModel = mongoose_1.default.model('Rings', RingSchema);
const getRings = () => exports.RingModel.find();
exports.getRings = getRings;
const getRingById = (id) => exports.RingModel.findById(id);
exports.getRingById = getRingById;
const createRing = (values) => new exports.RingModel(values)
    .save().then((ring) => ring.toObject());
exports.createRing = createRing;
const deleteRingById = (id) => exports.RingModel.findOneAndDelete({ _id: id });
exports.deleteRingById = deleteRingById;
const updateRingById = (id, values) => exports.RingModel.findByIdAndUpdate(id, values);
exports.updateRingById = updateRingById;
//# sourceMappingURL=rings.js.map