import User from '../../models/User';
import InvoiceHistory from '../../models/InvoiceHistory';
import Payment from '~/server/models/payment';
import { getQuery, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);
  const userId = event.context.params?.id; // Dapatkan ID pengguna dari URL

  if (method === 'GET') {
    if (!userId) {
      return createError({
        statusCode: 400,
        statusMessage: 'User ID is required',
      });
    }

    try {
      // Cari pengguna berdasarkan ID
      const user = await User.findById(userId);
      if (!user) {
        return createError({
          statusCode: 404,
          statusMessage: 'User not found',
        });
      }

      // Ambil riwayat tagihan dan pembayaran
      const invoiceHistory = await InvoiceHistory.find({ userId }).sort({ created_at: -1 });
      const payments = await Payment.find({ userId });

      const userDetails = {
        user,
        invoice_history: invoiceHistory,
        payments,
      };

      return { userDetails };
    } catch (error) {
      return createError({
        statusCode: 500,
        statusMessage: 'Error fetching user details',
      });
    }
  }

  if (method === 'DELETE') {
    if (!userId) {
      return createError({
        statusCode: 400,
        statusMessage: 'User ID is required',
      });
    }

    try {
      // Hapus pengguna dan data terkait
      await User.findByIdAndDelete(userId);
      await InvoiceHistory.deleteMany({ userId });
      await Payment.deleteMany({ userId });

      return { message: 'User and associated data deleted successfully' };
    } catch (error) {
      return createError({
        statusCode: 500,
        statusMessage: 'Error deleting user',
      });
    }
  }

  return createError({
    statusCode: 405,
    statusMessage: 'Method Not Allowed',
  });
});
