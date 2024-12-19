import { Schema, model, Document } from 'mongoose';

// Enum PaymentMethod dengan nilai string literals yang eksplisit
export enum PaymentMethod {
  QRIS = 'QRIS',
  BANK_TRANSFER = 'BANK_TRANSFER'
}

export interface IPayment extends Document {
  total_bill: number;
  payment_method: PaymentMethod;
  rent_periods: number;
  userId: Schema.Types.ObjectId;  
}

// Schema Payment
const PaymentSchema = new Schema<IPayment>({
  total_bill: { type: Number, required: true },
  payment_method: { 
    type: String, 
    enum: Object.values(PaymentMethod), // Menyambungkan dengan enum
    required: true 
  },
  rent_periods: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Payment = model<IPayment>('Payment', PaymentSchema);

export default Payment;
