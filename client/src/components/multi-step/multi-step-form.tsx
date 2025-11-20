import { type FC, useRef, useState } from 'react';
import LanguageSwitcher from '../language-switcher/language-switcher.tsx';
import CustomForm from '../form/form.tsx';
import personalInfoInputs from '../../constants/personalInfoInputs.ts';
import { useTranslation } from 'react-i18next';
import type { CustomFormHandle } from '../../types/customFormHandle.ts';
import { Button, Steps, Grid } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store.ts';
import familyFinancialInfoInputs from '../../constants/familyFinancialInfoInputs.ts';
import { setPersonalInfo } from '../../store/feature/personalInfo/personalInfoSlice.ts';
import {
  setStep,
  setStepValidity,
} from '../../store/feature/wizard/wizardSlice.ts';
import { setFamilyFinancialInfo } from '../../store/feature/familyFinancialInfo/familyFinancialInfoSlice.ts';
import situationDescriptionInputs from '../../constants/situationDescriptionInputs.ts';
import AiPopup from '../ai-popup/ai-popup.tsx';
import { setSituationDescription } from '../../store/feature/situationDescription/situationDescriptionSlice.ts';
import SuccessStep from '../success-step/success-step.tsx';
import { submitFinalForm } from '../../store/feature/submission/submissionThunk.ts';
import ThemeSwitcher from '../theme-switcher/theme-switcher.tsx';

interface Step {
  title: string;
}

interface MultiStepFormProps {
  title: string;
  description: string;
}

const { useBreakpoint } = Grid;

const MultiStepForm: FC<MultiStepFormProps> = ({ title, description }) => {
  const [activeHelpField, setActiveHelpField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const currentStep = useSelector(
    (state: RootState) => state.wizard.currentStep
  );
  const personalInfo = useSelector((state: RootState) => state.personalInfo);
  const familyFinancialInfo = useSelector(
    (state: RootState) => state.familyFinancialInfo
  );

  const situationDescription = useSelector(
    (state: RootState) => state.situationDescription
  );

  const { t } = useTranslation();

  const formRef = useRef<CustomFormHandle>(null);
  const screens = useBreakpoint();
  const isMobile = !screens.sm;
  const isAiPopupOpen = activeHelpField !== null;

  const handleSavePartial = (data: Record<string, any>) => {
    console.log('Auto-saving data on blur:', data);
    if (currentStep == 0) {
      const serializableData = {
        ...data,
        dateOfBirth: data.dateOfBirth
          ? (data.dateOfBirth as Date).toISOString()
          : null,
      };
      dispatch(setPersonalInfo(serializableData));
    }

    if (currentStep === 1) {
      dispatch(setFamilyFinancialInfo(data));
    }

    if (currentStep === 2) {
      dispatch(setSituationDescription(data));
    }
  }

  const handleFormSubmit = () => {
    dispatch(setStepValidity({ step: currentStep, isValid: true }));

    if (currentStep === 2) {
      setIsLoading(true)
      dispatch(submitFinalForm())
        .unwrap()
        .then(() => {
          dispatch(setStep(currentStep + 1));
        })
        .catch((err) => {
          console.error("Submission failed", err);
        }).finally(() => {
          setIsLoading(false)
      })
      return;
    }
    dispatch(setStep(currentStep + 1));
  };

  const handleSubmitButton = async () => {
    console.log('work: ', formRef);
    formRef?.current?.submit();
  };

  const handleBackButton = () => {
    if (currentStep > 0) {
      dispatch(setStep(currentStep - 1));
    }
  };

  const steps: Step[] = [
    {
      title: `${t('multi-step.steps.personal_info')}`,
    },
    {
      title: `${t('multi-step.steps.financial_info')}`,
    },
    {
      title: `${t('multi-step.steps.situation_description')}`,
    },
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <h2 className="text-xl font-semibold text-slate-700 mb-6 dark:text-gray-200">
              {t('multi-step.form_title_one')}
            </h2>
            <CustomForm
              className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0"
              inputs={personalInfoInputs}
              defaultModel={personalInfo}
              onFormSubmit={handleFormSubmit}
              ref={formRef}
              title="personal_info"
              key={currentStep}
              onSavePartial={handleSavePartial}
            />
          </>
        );
      case 1:
        return (
          <>
            <h2 className="text-xl font-semibold text-slate-700 mb-6">
              {t('multi-step.form_title_two')}
            </h2>
            <CustomForm
              className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0"
              inputs={familyFinancialInfoInputs}
              defaultModel={familyFinancialInfo}
              onFormSubmit={handleFormSubmit}
              onSavePartial={handleSavePartial}
              ref={formRef}
              title="family_financial_info"
              isMobile={isMobile}
              key={currentStep}
            />
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-xl font-semibold text-slate-700 mb-6">
              {t('multi-step.form_title_three')}
            </h2>
            <CustomForm
              className="grid grid-cols-1 gap-y-0"
              inputs={situationDescriptionInputs}
              defaultModel={situationDescription}
              onFormSubmit={handleFormSubmit}
              onSavePartial={handleSavePartial}
              ref={formRef}
              title="situation_description"
              onHelpMeWriteClick={setActiveHelpField}
              key={currentStep}
            />
          </>
        );
      case 3:
        return <SuccessStep />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`
        w-full transition-all duration-300
        ${isAiPopupOpen ? 'lg:flex lg:gap-3' : ''}
      `}
    >
      <div
        className={`
          w-full
          ${isAiPopupOpen ? 'lg:w-2/3' : ''}
        `}
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center pt-6 pl-6 pr-6 sm:pl-8 sm:pt-8 sm:pr-8">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
          <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl dark:text-white">
              {title}
            </h1>
            <p className="text-slate-600 mt-2 dark:text-gray-300">{description}</p>
          </div>
          <div className="p-6 sm:p-8">
            <Steps
              current={currentStep}
              items={steps}
              direction={isMobile ? 'vertical' : 'horizontal'}
            />
          </div>
          <div className="pl-6 pr-6 sm:pl-8 sm:pr-8">{renderStepContent()}</div>
          <div
            className={`p-6 border-t border-gray-200 dark:border-gray-700 flex flex-col-reverse justify-between items-center gap-4 sm:flex-row ${currentStep === 0 ? 'sm:justify-end' : 'sm:justify-between'} sm:p-8`}
          >
            {currentStep > 0 && currentStep < 3 && (
              <Button
                className="w-full capitalize sm:w-auto"
                size="large"
                onClick={handleBackButton}
              >
                {t('multi-step.previous')}
              </Button>
            )}
            {currentStep < 3 && (
              <Button
                className="w-full capitalize sm:w-auto"
                type="primary"
                size="large"
                onClick={handleSubmitButton}
                loading={isLoading}
                disabled={isLoading}
              >
                {currentStep < steps.length - 1
                  ? t('multi-step.next')
                  : t('multi-step.done')}
              </Button>
            )}
          </div>
        </div>
      </div>
      <AiPopup
        fieldModel={activeHelpField}
        onClose={() => setActiveHelpField(null)}
        formRef={formRef}
        title="AI Helper"
      />
    </div>
  );
};

export default MultiStepForm;
