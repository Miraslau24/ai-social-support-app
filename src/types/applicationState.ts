export interface IApplicationState {
  formData: {
    personalInfo: {
      name: string;
      nationalId: string;
      dateOfBirth: string | null;
      gender: string | null;
      address: string;
      city: string;
      state: string;
      country: string;
      phone: string;
      email: string;
    };
    familyFinancialInfo: {
      maritalStatus: string | null;
      dependents: number;
      employmentStatus: string | null;
      monthlyIncome: number;
      housingStatus: string | null;
    };
    situationDescription: {
      currentFinancialSituation: string;
      employmentCircumstances: string;
      reasonForApplying: string;
    };
  };
  wizard: {
    currentStep: number;
    stepValidity: Record<number, boolean>;
  };

  submission: {
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
  };
}
