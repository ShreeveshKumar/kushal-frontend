import { useQuery } from '@tanstack/react-query';
import getUserTasks from 'Api/userTasks';

export const useScheduleData = () => {
    return useQuery({
        queryKey: ['tasks'],  
        queryFn: getUserTasks,
        refetchInterval: 60000,
    });
};
