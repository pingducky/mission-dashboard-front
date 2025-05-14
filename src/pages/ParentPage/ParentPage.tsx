import React, { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar/Sidebar";
import { capitalize, Divider } from "@mui/material";
import { MainTitlePage } from "./MainPageTitle/MainPageTitle";
import BreadcrumbNav from "./BreadcrumbNav/BreadcrumbNav";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import GroupIcon from "@mui/icons-material/Group";
import ListAltIcon from "@mui/icons-material/ListAlt";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsIcon from '@mui/icons-material/Settings';
import { getUserDataFromToken } from "../../utils/auth";
import { useUserData } from "../../hooks/useUserData";
import "../../app/styles/global.scss";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import EmployeesPage from "../EmployeesPage/EmployeesPage";
import DashboardPage from "../DashboardPage/DashboardPage";
import { EmployeePage } from "../EmployeePage/EmployeePage";
import { useGetEmployee } from "../../hooks/useGetEmployee";
import { useGetUserFiles } from "../../hooks/useGetUserFiles";
import PlanningPage from "../PlanningPage/PlanningPage";
import CreateEmployeePage from "../Employee/CreateEmployeePage/CreateEmployeePage";
import AddSessionDrawer from "../../components/AddSessionDrawer/AddSessionDrawer";
import styles from "./ParentPage.module.scss";
import TimePointingCalendar from "../TimePointingCalendar/TimePointingCalendar";

type BreadcrumbItem = {
  label: string;
  page: string;
  id?: string;
};

const ParentPage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const logoutMutation = useLogout();
  const [employeeId, setEmployeeId] = useState<number>(0);
  const tokenData = getUserDataFromToken(); 

  useEffect(() => {
    if (!tokenData) {
      window.location.href = '/login';
    }
  }, [tokenData]);

  const { data: userData, isLoading } = useUserData();

  const [activePage, setActivePage] = useState<string>("dashboard");
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { label: "Dashboard", page: "dashboard" },
  ]);
  
  const handleLogout = () => {
    const token = sessionStorage.getItem("token");
  
    if (token) {
      logoutMutation.mutate(token);
    }
  
    logout();
    navigate("/login");
  };
  
  const handleNavigation = (page: string, label: string, id?: string) => {
    if (page === "logout") {
      handleLogout();
      return;
    }
  
    if (!id) {
      setBreadcrumbs([{ label, page }]);
    } else {
      setBreadcrumbs((prev) => [...prev, { label, page, id }]);
    }
  
    setActivePage(page);
  };

  const handleBreadcrumbClick = (index: number) => {
    if (index === -1) {
      setBreadcrumbs([{ label: "Dashboard", page: "dashboard" }]);
      setActivePage("dashboard");
    } else {
      const selected = breadcrumbs[index];
      setBreadcrumbs(breadcrumbs.slice(0, index + 1));
      setActivePage(selected.page);
    }
  };

  const getPageMeta = (page: string, breadcrumbs: BreadcrumbItem[]) => {
    switch (page) {
      case "dashboard":
        return { title: "Tableau de bord", icon: <CalendarMonthOutlinedIcon /> };
      case "planning":
        return { title: "Planning", icon: <CalendarMonthOutlinedIcon /> };
      case "salarie":
        return { title: "Salariés", icon: <GroupIcon /> };
      case "salarieDetail":
        return {
          title: breadcrumbs[breadcrumbs.length - 1]?.label || "Détails salarié",
          icon: <GroupIcon />,
        };
      case "salarieCreation":
        return {
          title: "Nouveau salarié",
          icon: <SettingsIcon />,
        };
      case "missions":
        return { title: "Liste missions", icon: <ListAltIcon /> };
      case "missionDetail":
        return {
          title: breadcrumbs[breadcrumbs.length - 1]?.label || "Détails mission",
          icon: <ListAltIcon />,
        };
      case "notifications":
        return { title: "Notifications", icon: <NotificationsNoneIcon /> };
      case "compte":
        return { title: "Compte", icon: <PersonOutlineIcon /> };
      default:
        return { title: "Page", icon: <CalendarMonthOutlinedIcon /> };
    }
  };

  const { data: employee, isLoading: isEmployeeLoading } = useGetEmployee(activePage, employeeId);
  const { data: employeeFiles, isLoading: areFilesLoading} = useGetUserFiles(employeeId, activePage);

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage firstname={userData?.firstName} />;
      case "planning":
        return <PlanningPage/>
      case "pointage":
        return <TimePointingCalendar/>
      case "salarie":
        return <EmployeesPage
          handleNavigation={handleNavigation}
          setEmployeeId={setEmployeeId}
        />;
      case "salarieDetail":
        return <EmployeePage 
          employee={employee}
          files={employeeFiles || []}
          isEmployeeLoading={isEmployeeLoading}
          areFilesLoading={areFilesLoading}
        />;
      case "salarieCreation": 
        return <CreateEmployeePage handleNavigation={handleNavigation}/>
      case "missions":
        return (
          <div>
            <div>Liste des missions</div>
            <button onClick={() => handleNavigation("missionDetail", "Mission A", "42")}>
              Voir Mission A
            </button>
          </div>
        );
      case "missionDetail":
        return <div>Détails de la mission #{breadcrumbs[breadcrumbs.length - 1].id}</div>;
      case "notifications":
        return <div>Notifications Page</div>;
      case "compte":
        return <div>Compte Page</div>;
      case "logout":
        return <div>Déconnexion Page</div>;
      default:
        return <div>Page par défaut</div>;
    }
  };

  const { title, icon } = getPageMeta(activePage, breadcrumbs);

  return (
    <div className={styles.parentContainer}>
      <Sidebar
        isLoading={isLoading}
        activePage={activePage}
        name={userData?.lastName}
        firstname={userData?.firstName}
        onMenuClick={(page) => handleNavigation(page, capitalize(page))}
        isAdmin={userData?.isAdmin}
      />

      <div className={styles.content}>
      <MainTitlePage icon={icon} text={title} />
        <Divider />

        <BreadcrumbNav
          items={breadcrumbs}
          onBreadcrumbClick={handleBreadcrumbClick}
        />

        <div className={styles.subPage}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ParentPage;
