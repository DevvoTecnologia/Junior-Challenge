import mongoose from "mongoose";

const RingSchema = new mongoose.Schema({
  ringname: {type: String, require: true},
  description: {type: String, require: true},
  carrier: {type: String, require: true},
  forgedby: {type: String, require: true},
  image: {type: String, require: true},
});

export const RingModel = mongoose.model('Rings', RingSchema);

export const getRings = () => RingModel.find();
export const getRingById = (id: string) => RingModel.findById(id);
export const createRing = (values: Record<string, any>) => new RingModel(values)
  .save().then((ring) => ring.toObject());
export const deleteRingById = (id: string) => RingModel.findOneAndDelete({_id: id});
export const updateRingById = (id: string, values: Record<string, any>) => RingModel.findByIdAndUpdate(id, values);