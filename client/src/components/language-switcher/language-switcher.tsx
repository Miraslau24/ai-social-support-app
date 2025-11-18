import { useTranslation } from 'react-i18next';
import languages from '../../constants/languages.ts';
import { useMemo } from 'react';
import { Select } from 'antd';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (value: string) => {
    i18n.changeLanguage(value);
  };

  const listOfLanguages = useMemo(() => {
    return Object.keys(languages).map((key) => {
      return {
        value: `${key}`,
        label: languages[key].nativeName,
      };
    });
  }, []);

  return (
    <Select
      showSearch={true}
      placeholder="Select language"
      defaultValue={i18n.language}
      onChange={changeLanguage}
      options={listOfLanguages}
    />
  );
};

export default LanguageSwitcher;
