import { Control, useController } from 'react-hook-form';
import { ChatBookmark } from '@/components/chat-bookmark/type';

export const useChatBookmarkForm = ({
  control,
}: {
  control: Control<ChatBookmark>;
}) => {
  const {
    field: chatBookmark,
    fieldState: { error },
    formState: { isSubmitting },
  } = useController({
    name: 'chatBookmark',
    control,
    rules: {
      required: true,
    },
  });
  return { chatBookmark, error, isSubmitting };
};
