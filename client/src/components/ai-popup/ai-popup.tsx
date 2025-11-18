import { type FC, type RefObject, useEffect, useState } from 'react';
import { Alert, Button, Skeleton, Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import TypeWriter from '../type-writer/type-writer.tsx';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store.ts';
import { clearAiSuggestion } from '../../store/feature/aiSuggestion/aiSuggestionSlice.ts';
import { fetchAiSuggestion } from '../../store/feature/aiSuggestion/aiSuggestionThunk.ts';
import type { CustomFormHandle } from '../../types/customFormHandle.ts';
import { EditOutlined, CheckOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { TextArea } = Input;

interface AiPopupProps {
  onClose: () => void;
  title: string;
  formRef: RefObject<CustomFormHandle | null>;
  fieldModel: string | null;
}

const AiPopup: FC<AiPopupProps> = ({ onClose, title, formRef, fieldModel }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState('');
  const { t } = useTranslation();

  const {
    status: aiStatus,
    error: aiError,
    suggestion: aiSuggestion,
  } = useSelector((state: RootState) => state.aiSuggestion);

  const isLoading = aiStatus === 'loading';
  const isOpen = fieldModel !== null;

  const handleAccept = () => {
    const textToAccept = isEditing ? editedText : aiSuggestion || '';
    if (fieldModel) {
      formRef.current?.setFieldValue(fieldModel, textToAccept);
    }
    handleDiscard();
  };

  const handleDiscard = () => {
    dispatch(clearAiSuggestion());
    setIsEditing(false);
    onClose();
  };

  useEffect(() => {
    if (fieldModel && aiStatus === 'idle') {
      const prompt = t('ai.prompt');
      dispatch(fetchAiSuggestion({ translatedPrompt: prompt }));
    }
  }, [fieldModel, aiStatus, dispatch, t]);

  useEffect(() => {
    if (aiSuggestion) {
      setEditedText(aiSuggestion);
    }
  }, [aiSuggestion]);

  const renderContent = () => {
    if (isLoading) {
      return <Skeleton active paragraph={{ rows: 8 }} />;
    }

    if (aiError) {
      return (
        <Alert message="Error" description={aiError} type="error" showIcon />
      );
    }

    if (aiSuggestion) {
      if (isEditing) {
        return (
          <TextArea
            value={editedText}
            onChange={(event) => setEditedText(event.target.value)}
            autoSize={{ minRows: 8, maxRows: 15 }}
          />
        );
      }
      return <TypeWriter text={aiSuggestion} />;
    }

    return null;
  };
  const PopupContent = (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-800 m-0">{title}</h2>
        <Button
          type="text"
          shape="circle"
          icon={<CloseOutlined />}
          onClick={handleDiscard}
        />
      </div>
      <div className="min-h-[200px]">{renderContent()}</div>
      {aiSuggestion && !aiError && (
        <div className="flex justify-end gap-2 mt-4">
          <Button
            type="primary"
            icon={<CheckOutlined />}
            onClick={handleAccept}
            shape="circle"
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => setIsEditing(!isEditing)}
            shape="circle"
          />
          <Button
            icon={<CloseOutlined />}
            onClick={handleDiscard}
            danger
            shape="circle"
          />
        </div>
      )}
    </>
  );

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        aria-hidden="true"
      ></div>
      <div className="fixed inset-x-4 bottom-4 z-50 rounded-2xl bg-white p-6 shadow-xl lg:hidden">
        {PopupContent}
      </div>
      <div className="hidden lg:block lg:w-1/3">
        <div className="sticky top-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
          {PopupContent}
        </div>
      </div>
    </>
  );
};

export default AiPopup;
