import { createTransform } from 'redux-persist';

const submissionInitialState = { status: 'idle', error: null };

export const applicationTransform = createTransform(
  (inboundState: any) => {
    const { submission, ...rest } = inboundState;
    return rest;
  },
  (outboundState: any) => {
    return {
      ...outboundState,
      submission: submissionInitialState,
    };
  },
  { whitelist: ['application'] }
);
