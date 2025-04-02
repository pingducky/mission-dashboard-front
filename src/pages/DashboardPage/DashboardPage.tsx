import "../../app/styles/global.scss";
import { useGetUserAccount } from "../../hooks/useGetUserAccount";

const DashboardPage: React.FC = () => {
    const { data, error, isLoading } = useGetUserAccount("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huLmRkb2VAZXhhbXBsZS5jb20iLCJpYXQiOjE3NDM1OTQ0NDcsImV4cCI6MTc0MzU5ODA0N30.zQb-s07DKo-2d8b0UiwK-K_wN3My-E06-4pFERd3b8Y");
    console.debug("data", data)
    return (
    <div>
        <p>Dashboard</p>
    </div>
    );
}
export default DashboardPage;