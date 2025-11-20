import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import MultiStepForm from './components/multi-step/multi-step-form.tsx';
import { useSelector } from 'react-redux';
import type { RootState } from './store/store.ts';
import { ConfigProvider, theme } from 'antd';

function App() {
  const { t, i18n } = useTranslation();
  const themeMode = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    document.documentElement.dir = i18n.dir(i18n.language);
    document.documentElement.lang = i18n.language;
  }, [i18n, i18n.language]);

  useEffect(() => {
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeMode]);

  return (
    <ConfigProvider theme={{
      algorithm: themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
      token: {
        colorPrimary: '#1677ff',
      }
    }}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-start justify-center sm:p-6 lg:p-8 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="w-full max-w-5xl mx-auto">
          <MultiStepForm
            title={t('multi-step.title')}
            description={t('multi-step.description')}
          />
        </div>
      </div>
    </ConfigProvider>
  );
}

export default App;
