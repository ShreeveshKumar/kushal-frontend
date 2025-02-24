import { useQuery } from "@tanstack/react-query";
import getUserRole from "Api/userRole";

export const useUserrole = () => {
    return useQuery({
        queryKey: ["userrole"],
        queryFn: getUserRole,
        refetchInterval: 10000
    })
}