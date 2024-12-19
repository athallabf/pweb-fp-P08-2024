import mongoose from 'mongoose';
import Room from './models/Room';

const initializeRooms = async () => {
  const rooms = [
    { roomNumber: '101', isOccupied: false },
    { roomNumber: '102', isOccupied: false },
    { roomNumber: '103', isOccupied: false },
    { roomNumber: '104', isOccupied: false },
    { roomNumber: '105', isOccupied: false },
    // tambahkan kamar lainnya sesuai kebutuhan
  ];

  // Sambungkan ke database MongoDB
  await mongoose.connect(process.env.MONGO_URL || '');

  // Periksa apakah kamar sudah ada
  const existingRooms = await Room.countDocuments();

  if (existingRooms === 0) {
    await Room.insertMany(rooms);
    console.log('Rooms initialized');
  } else {
    console.log('Rooms already exist');
  }

  // Tutup koneksi database
  mongoose.disconnect();
};

initializeRooms().catch(console.error);
