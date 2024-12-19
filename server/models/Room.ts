import mongoose, { Schema, Document } from 'mongoose';

export interface RoomDocument extends Document {
  roomNumber: string;
  isOccupied: boolean;
}

const roomSchema = new Schema<RoomDocument>({
  roomNumber: { type: String, required: true, unique: true },
  isOccupied: { type: Boolean, default: false },
});

const Room = mongoose.model<RoomDocument>('Room', roomSchema);
export default Room;
