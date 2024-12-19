import { Schema, model, Document } from 'mongoose';

interface IUserReport extends Document {
  message: string;
  createdAt: Date;
}

const UserReportSchema = new Schema<IUserReport>({
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const UserReport = model<IUserReport>('UserReport', UserReportSchema);

export default UserReport;
