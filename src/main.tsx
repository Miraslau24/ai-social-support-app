import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import '@ant-design/v5-patch-for-react-19';
import './i18n';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store.ts';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  //</StrictMode>
);
