import UserReport from '~/server/models/UserReport';
import { readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  if (method === 'GET') {
    try {
      // Ambil semua laporan dari database
      const reports = await UserReport.find().sort({ createdAt: -1 });

      return { reports };
    } catch (error) {
      return createError({
        statusCode: 500,
        statusMessage: 'Error fetching reports',
      });
    }
  }

  if (method === 'POST') {
    const body = await readBody(event);
    const { message } = body;

    if (!message) {
      return createError({
        statusCode: 400,
        statusMessage: 'Message is required',
      });
    }

    try {
      // Buat laporan baru
      const newReport = new UserReport({ message });
      await newReport.save();

      return { message: 'Report submitted successfully', report: newReport };
    } catch (error) {
      return createError({
        statusCode: 500,
        statusMessage: 'Error submitting report',
      });
    }
  }

  return createError({
    statusCode: 405,
    statusMessage: 'Method Not Allowed',
  });
});
