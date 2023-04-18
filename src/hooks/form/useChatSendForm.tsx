import { Control, useController } from 'react-hook-form';
import type { ChatMessage } from '@/components/chat-page/type';

export const useChatSendForm = ({
  control,
}: {
  control: Control<ChatMessage>;
}) => {
  const {
    field: chatMessage,
    fieldState: { error },
    formState: { isSubmitting },
  } = useController({
    name: 'chatMessage',
    control,
    rules: {
      required: true,
    },
  });
  return { chatMessage, error, isSubmitting };
};
