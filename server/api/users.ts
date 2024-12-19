import { defineEventHandler, readBody, createError, sendError } from 'h3';
import User from '../models/User';
import connectDB from '../utils/db';

export default defineEventHandler(async (event) => {
  await connectDB();

  // GET: Ambil semua user atau user spesifik berdasarkan ID
  if (event.req.method === 'GET') {
    const { id } = event.context.params || {};
    if (id) {
      const user = await User.findById(id);
      if (!user) {
        throw createError({
          statusCode: 404,
          statusMessage: 'User not found',
        });
      }
      return { user };
    }
    const users = await User.find();
    return { users };
  }

  // POST: Tambah user baru
  if (event.req.method === 'POST') {
    const body = await readBody(event);
    if (!body.username || !body.password || !body.role) {
      throw createError({
        statusCode: 400,
        statusMessage: 'username, password, and role are required',
      });
    }
    const newUser = await User.create(body);
    return { user: newUser };
  }

  // DELETE: Hapus user berdasarkan ID
  if (event.req.method === 'DELETE') {
    const { id } = event.context.params || {};
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'User ID is required for deletion',
      });
    }
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found',
      });
    }
    return { message: 'User deleted successfully', user: deletedUser };
  }

  // Method tidak diizinkan
  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed',
  });
});
