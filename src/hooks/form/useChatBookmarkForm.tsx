import { Control, useController } from 'react-hook-form';
import { ChatBookmarkFormType } from '@/components/chat-bookmark/type';

export const useChatBookmarkForm = ({
  control,
}: {
  control: Control<ChatBookmarkFormType>;
}) => {
  const {
    field: chatBookmarkTitle,
    fieldState: { error: titleError },
  } = useController({
    name: 'chatBookmarkTitle',
    control,
    rules: {
      required: true,
    },
  });
  const {
    field: chatBookmarkContent,
    fieldState: { error: contentError },
    formState: { isSubmitting },
  } = useController({
    name: 'chatBookmarkContent',
    control,
    rules: {
      required: true,
    },
  });
  return {
    chatBookmarkTitle,
    chatBookmarkContent,
    titleError,
    contentError,
    isSubmitting,
  };
};
