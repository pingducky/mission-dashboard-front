import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

export type Duration = {
    /**
     * Hours
     */
    hours: number;
    /**
     * Minutes
     */
    minutes: number;
    /**
     * Secondes
     */
    seconds: number;
};

export type WorkSessionPause = {
    /**
     * Id
     */
    id: number;
    /**
     * Temps de pause
     */
    pauseTime: string;
    /**
     * Fin
     */
    resumeTime: string;
};

export type WorkSession = {
    /**
     * Id
     */
    id: number;
    /**
     * Id du compte utilisateur
     */
    idAccount: number;
    /**
     * Id de la mission
     */
    idMission: number;
    /**
     * Date de début
     */
    startTime: string;
    /**
     * Date de fin
     */
    endTime: string | null;
    /**
     * Status
     */
    status: string;
    /**
     * Pauses
     */
    pauses: WorkSessionPause[];
    /**
     * Durée total
     */
    totalDuration: Duration;
    /**
     * Durée de la pause
     */
    totalPause: Duration;
    /**
     * Durée effective
     */
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
