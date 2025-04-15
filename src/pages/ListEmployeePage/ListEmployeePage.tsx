import { getAllEmployees } from "../../hooks/getAllEmployees";

function ListEmployeePage(handleNavigation: (page: string, label: string, id: string) => void) {

    const ff = getAllEmployees(localStorage.getItem("token") ?? "ok");

    console.log("ff", ff);
    return (
        <div>
            <h1>List Employee Page</h1>
            <button onClick={() => handleNavigation("salarieDetail", "Jean Dupont", "1")}>
                Voir Jean Dupont
            </button>
        </div>
    );
}

export default ListEmployeePage;