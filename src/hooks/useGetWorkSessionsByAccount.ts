import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

export type Duration = {
    hours: number;
    minutes: number;
    seconds: number;
};

export type WorkSessionPause = {
    id: number;
    pauseTime: string;
    resumeTime: string;
};

export type WorkSession = {
    id: number;
    idAccount: number;
    idMission: number;
    startTime: string;
    endTime: string | null;
    status: string;
    pauses: WorkSessionPause[];
    totalDuration: Duration;
    totalPause: Duration;
    effectiveDuration: Duration;
};

type Params = {
    accountId: string;
    from?: string;
    to?: string;
};

const getWorkSessionsByAccount = async ({ accountId, from, to }: Params): Promise<WorkSession[]> => {
    const params = new URLSearchParams();
    if (from) params.append("from", from);
    if (to) params.append("to", to);

    const url = `${API_URL}/workSession/byDate/${accountId}?${params.toString()}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la récupération des sessions de travail");
    }

    const data = await response.json();
    return data.sessions;
};

export const useGetWorkSessionsByAccount = (params: Params, enabled = true) => {
    return useQuery({
        queryKey: ["workSessions", params],
        queryFn: () => getWorkSessionsByAccount(params),
        enabled,
    });
};
