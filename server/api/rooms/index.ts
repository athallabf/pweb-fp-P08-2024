// server/api/rooms/index.ts
import Room from '../../models/Room';
import { readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  if (method === 'GET') {
    // Ambil semua kamar dari database
    const rooms = await Room.find();

    // Hitung jumlah kamar yang kosong dan yang terisi
    const empty = rooms.filter((room) => !room.isOccupied).length;
    const filled = rooms.filter((room) => room.isOccupied).length;

    return { empty, filled };
  }

  if (method === 'POST') {
    const body = await readBody(event);
    const { roomNumber } = body;

    // Cek apakah kamar dengan nomor yang sama sudah ada
    const existingRoom = await Room.findOne({ roomNumber });

    if (existingRoom) {
      return createError({
        statusCode: 400,
        statusMessage: 'Room already exists',
      });
    }

    // Membuat kamar baru
    const newRoom = new Room({
      roomNumber,
      isOccupied: false,  // Default isOccupied adalah false
    });

    // Simpan kamar baru ke dalam database
    await newRoom.save();

    return { message: 'Room added successfully', room: newRoom };
  }

  return createError({
    statusCode: 405,
    statusMessage: 'Method Not Allowed',
  });
});
