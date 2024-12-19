import Room from '../../models/Room';
import { readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  if (method === 'POST') {
    const body = await readBody(event);
    const { roomNumber, userId } = body;

    // Cari kamar berdasarkan nomor dan userId
    const room = await Room.findOne({ roomNumber, userId });

    if (!room) {
      return createError({
        statusCode: 404,
        statusMessage: 'Room not found or user did not rent this room',
      });
    }

    // Update status kamar menjadi kosong
    room.isOccupied = false;
    // room.userId = null; // Menghapus userId
    await room.save();

    return { message: 'Room checked out successfully', room };
  }

  return createError({
    statusCode: 405,
    statusMessage: 'Method Not Allowed',
  });
});
