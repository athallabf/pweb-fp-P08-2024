import Room from '../../models/Room';
import { readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  if (method === 'POST') {
    const body = await readBody(event);
    const { roomNumber, userId } = body;

    // Cari kamar berdasarkan nomor
    const room = await Room.findOne({ roomNumber });

    if (!room) {
      return createError({
        statusCode: 404,
        statusMessage: 'Room not found',
      });
    }

    if (room.isOccupied) {
      return createError({
        statusCode: 400,
        statusMessage: 'Room is already occupied',
      });
    }

    // Update status kamar menjadi terisi dan simpan userId
    room.isOccupied = true;
    // room.userId = userId;  // Menyimpan ID pengguna yang menyewa kamar
    await room.save();

    return { message: 'Room rented successfully', room };
  }

  return createError({
    statusCode: 405,
    statusMessage: 'Method Not Allowed',
  });
});
