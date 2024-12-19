import { Schema, model, Document } from 'mongoose';

export interface IUserDetail extends Document {
  user: Schema.Types.ObjectId;  
  invoice_history: Array<{ bill: number; created_at: Date }>;
}

const UserDetailSchema = new Schema<IUserDetail>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  invoice_history: [
    {
      bill: { type: Number, required: true },
      created_at: { type: Date, default: Date.now },
    },
  ],
});

const UserDetail = model<IUserDetail>('UserDetail', UserDetailSchema);

export default UserDetail;
