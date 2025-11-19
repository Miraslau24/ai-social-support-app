import mongoose, { Schema, Document } from 'mongoose';

export interface Application extends Document {
  personalInfo: {
    name: string;
    nationalId: string;
    dateOfBirth: string;
    gender: string;
    address: string;
    city: string;
    state: string;
    country: string;
    phone: string;
    email: string;
  };
  familyFinancialInfo: {
    maritalStatus: string;
    dependents: number;
    employmentStatus: string;
    monthlyIncome: number;
    housingStatus: string;
  };
  situationDescription: {
    currentFinancialSituation: string;
    employmentCircumstances: string;
    reasonForApplying: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

const ApplicationSchema: Schema = new Schema(
  {
    personalInfo: {
      name: { type: String, required: true },
      nationalId: { type: String, required: true },
      dateOfBirth: { type: String, required: true },
      gender: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
    familyFinancialInfo: {
      maritalStatus: { type: String, required: true },
      dependents: { type: Number, required: true },
      employmentStatus: { type: String, required: true },
      monthlyIncome: { type: Number, required: true },
      housingStatus: { type: String, required: true },
    },
    situationDescription: {
      currentFinancialSituation: { type: String, required: true },
      employmentCircumstances: { type: String, required: true },
      reasonForApplying: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<Application>('Application', ApplicationSchema);
