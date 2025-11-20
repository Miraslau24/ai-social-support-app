import type { FC } from 'react';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store.ts';
import { Button } from 'antd';
import { toggleTheme } from '../../store/feature/theme/themeSlice.ts';


const ThemeSwitcher: FC = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.theme.mode);

  return (
    <Button
      icon={themeMode === 'light' ? <MoonOutlined /> : <SunOutlined />}
      onClick={() => dispatch(toggleTheme())}
      type="default"
      shape="circle"
    />
  );
}

export default ThemeSwitcher;