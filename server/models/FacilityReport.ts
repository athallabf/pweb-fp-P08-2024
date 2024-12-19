import mongoose, { Document, Schema } from 'mongoose';

interface IFacilityReport extends Document {
  message: string;
  user: mongoose.Schema.Types.ObjectId;
  created_at: Date;
}

const facilityReportSchema: Schema = new Schema(
  {
    message: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    created_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const FacilityReport = mongoose.model<IFacilityReport>('FacilityReport', facilityReportSchema);

export default FacilityReport;
