import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { landlordInboxApi } from '../lib/api/inbox';
import { Conversation, Message } from '@/lib/api/support-types';
import { toast } from 'react-toastify';

export const useLandlordInbox = (selectedId?: string | null) => {
    const queryClient = useQueryClient();

    const { data: conversations = [], isLoading: isLoadingConversations } = useQuery({
        queryKey: ['landlord-conversations'],
        queryFn: landlordInboxApi.getConversations,
        staleTime: 1000 * 60, // 1 minute
    });

    const { data: messages = [], isLoading: isLoadingMessages } = useQuery({
        queryKey: ['landlord-messages', selectedId],
        queryFn: () => landlordInboxApi.getMessages(selectedId!),
        enabled: !!selectedId,
        staleTime: 1000 * 10, // 10 seconds
    });

    const sendMessageMutation = useMutation({
        mutationFn: ({ conversationId, text, attachments }: { conversationId: string, text: string, attachments?: any[] }) => 
            landlordInboxApi.sendMessage(conversationId, text, attachments),
        onSuccess: (newMessage) => {
            queryClient.setQueryData(['landlord-messages', newMessage.conversationId], (old: Message[] = []) => [...old, newMessage]);
            queryClient.invalidateQueries({ queryKey: ['landlord-conversations'] });
        },
        onError: (error: any) => {
            console.error('Failed to send message:', error);
            toast.error('Failed to send message');
        }
    });

    const markAsReadMutation = useMutation({
        mutationFn: (conversationId: string) => landlordInboxApi.markAsRead(conversationId),
        onSuccess: (_, conversationId) => {
            queryClient.invalidateQueries({ queryKey: ['landlord-conversations'] });
        }
    });

    return {
        conversations,
        messages,
        isLoading: isLoadingConversations || isLoadingMessages,
        sendMessage: sendMessageMutation.mutate,
        isSending: sendMessageMutation.isPending,
        markAsRead: markAsReadMutation.mutate,
    };
};
