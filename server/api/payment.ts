// server/api/payment/index.ts
import Payment from '~/server/models/payment';
import InvoiceHistory from '~/server/models/InvoiceHistory';
import UserDetail from '~/server/models/userDetail';
import { readBody } from 'h3';
import { ObjectId } from 'mongodb';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  if (method === 'GET') {
    const { userId } = getQuery(event) as { userId: string };

    if (!userId) {
      return createError({
        statusCode: 400,
        statusMessage: 'User ID is required',
      });
    }

    try {
      const payments = await Payment.find({ userId: new ObjectId(userId) });
      return { payments };
    } catch (error) {
      return createError({
        statusCode: 500,
        statusMessage: 'Error fetching payments',
      });
    }
  }

  if (method === 'POST') {
    const body = await readBody(event);
    const { total_bill, payment_method, rent_periods, userId } = body;
  
    if (!total_bill || !payment_method || !rent_periods || !userId) {
      return createError({
        statusCode: 400,
        statusMessage: 'Missing required fields',
      });
    }
  
    try {
      // Buat pembayaran baru dengan menyertakan userId
      const newPayment = new Payment({
        total_bill,
        payment_method,
        rent_periods,
        userId: new ObjectId(userId),  // Pastikan menyertakan userId
      });
  
      // Simpan pembayaran baru ke database
      await newPayment.save();
  
      // Simpan riwayat pembayaran ke InvoiceHistory
      const newInvoiceHistory = new InvoiceHistory({
        bill: total_bill,
        userId: new ObjectId(userId),  // Pastikan juga menyertakan userId
      });
  
      await newInvoiceHistory.save();
  
      // Update UserDetail untuk menambahkan InvoiceHistory baru
      let userDetail = await UserDetail.findOne({ user: new ObjectId(userId) });
  
      if (!userDetail) {
        // Jika UserDetail belum ada, buat baru
        userDetail = new UserDetail({
          user: new ObjectId(userId),
          invoice_history: [{ bill: total_bill, created_at: new Date() }],
        });
      } else {
        // Jika sudah ada, tambahkan InvoiceHistory ke dalam array
        userDetail.invoice_history.push({ bill: total_bill, created_at: new Date() });
      }
  
      await userDetail.save();
  
      return { message: 'Payment successfully created and invoice history updated', payment: newPayment };
    } catch (error) {
      return createError({
        statusCode: 500,
        statusMessage: 'Error creating payment',
      });
    }
  }  

  if (method === 'DELETE') {
    const { paymentId } = getQuery(event);

    if (!paymentId) {
      return createError({
        statusCode: 400,
        statusMessage: 'Payment ID is required',
      });
    }

    try {
      const payment = await Payment.findByIdAndDelete(paymentId);

      if (!payment) {
        return createError({
          statusCode: 404,
          statusMessage: 'Payment not found',
        });
      }

      // Hapus InvoiceHistory yang terkait
      await InvoiceHistory.deleteOne({ _id: payment._id });

      // Hapus riwayat pembayaran dari UserDetail
      await UserDetail.updateOne(
        { user: payment.get('userId') },
        { $pull: { invoice_history: { bill: payment.total_bill } } }
      );

      return { message: 'Payment and invoice history successfully deleted' };
    } catch (error) {
      return createError({
        statusCode: 500,
        statusMessage: 'Error deleting payment',
      });
    }
  }

  return createError({
    statusCode: 405,
    statusMessage: 'Method Not Allowed',
  });
});
