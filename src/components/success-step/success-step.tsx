import { CheckCircleFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetPersonalInfo } from '../../store/feature/personalInfo/personalInfoSlice.ts';
import { resetFamilyFinancialInfo } from '../../store/feature/familyFinancialInfo/familyFinancialInfoSlice.ts';
import { resetSituationDescription } from '../../store/feature/situationDescription/situationDescriptionSlice.ts';
import { clearAiSuggestion } from '../../store/feature/aiSuggestion/aiSuggestionSlice.ts';
import { resetWizard } from '../../store/feature/wizard/wizardSlice.ts';

const SuccessStep = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(resetPersonalInfo());
      dispatch(resetFamilyFinancialInfo());
      dispatch(resetSituationDescription());
      dispatch(clearAiSuggestion());

      dispatch(resetWizard());
    }, 5000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <CheckCircleFilled className="text-6xl text-green-500 mb-6" />
      <h2 className="text-2xl font-semibold text-slate-800 mb-2">
        {t('thanks')}
      </h2>
      <p className="text-slate-600 text-center max-w-xs">
        {t('final_description')}
      </p>
    </div>
  );
};

export default SuccessStep;
