import { defineEventHandler, getMethod, readBody } from 'h3';
import UserReport from '../models/UserReport';
import connectDB from '../utils/db';

export default defineEventHandler(async (event) => {
  await connectDB();  // Pastikan koneksi ke database MongoDB

  const method = getMethod(event);

  // Jika GET, ambil semua laporan penghuni
  if (method === 'GET') {
    const reports = await UserReport.find();
    return { reports };
  }

  // Jika POST, buat laporan penghuni baru
  if (method === 'POST') {
    const body = await readBody(event);
    const report = await UserReport.create(body);
    return { report };
  }
});
