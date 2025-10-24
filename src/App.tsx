import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import MultiStepForm from './components/multi-step/multi-step-form.tsx';
import SuccessStep from './components/success-step/success-step.tsx';

function App() {
  const { t, i18n } = useTranslation();
  //const [isAiPopupOpen, setIsAiPopupOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dir = i18n.dir(i18n.language);
    document.documentElement.lang = i18n.language;
  }, [i18n, i18n.language]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-start justify-center sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl mx-auto">
        <MultiStepForm
          title={t('multi-step.title')}
          description={t('multi-step.description')}
        />
      </div>
    </div>
  );
}

export default App;
