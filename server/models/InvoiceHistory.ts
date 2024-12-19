import { Schema, model, Document } from 'mongoose';

export interface IInvoiceHistory extends Document {
  bill: number;
  created_at: Date;
  userId: Schema.Types.ObjectId;  // Menghubungkan invoice history ke pengguna
}

const InvoiceHistorySchema = new Schema<IInvoiceHistory>({
  bill: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const InvoiceHistory = model<IInvoiceHistory>('InvoiceHistory', InvoiceHistorySchema);

export default InvoiceHistory;
