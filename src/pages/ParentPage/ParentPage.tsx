import React, { useState } from "react";
import "../../app/styles/global.scss";
import Sidebar from "../../components/layout/Sidebar/Sidebar";
import { Divider } from "@mui/material";
import { MainTitlePage } from "./MainPageTitle/MainPageTitle";
import BreadcrumbNav from "./BreadcrumbNav/BreadcrumbNav";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import GroupIcon from "@mui/icons-material/Group";
import ListAltIcon from "@mui/icons-material/ListAlt";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./ParentPage.module.scss";

type BreadcrumbItem = {
  label: string;
  page: string;
  id?: string;
};

const ParentPage: React.FC = () => {
  const [activePage, setActivePage] = useState<string>("planning");
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { label: "Planning", page: "planning" },
  ]);

  const handleNavigation = (page: string, label: string, id?: string) => {
    if (!id) {
      setBreadcrumbs([{ label, page }]);
    } else {
      setBreadcrumbs((prev) => [...prev, { label, page, id }]);
    }
    setActivePage(page);
  };

  const handleBreadcrumbClick = (index: number) => {
    if (index === -1) {
      setBreadcrumbs([{ label: "Planning", page: "dashboard" }]);
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
        return { title: "Salarié", icon: <GroupIcon /> };
      case "salarieDetail":
        return {
          title: breadcrumbs[breadcrumbs.length - 1]?.label || "Détails salarié",
          icon: <GroupIcon />,
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
      case "logout":
        return { title: "Se déconnecter", icon: <LogoutIcon /> };
      default:
        return { title: "Page", icon: <CalendarMonthOutlinedIcon /> };
    }
  };

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <div>Tableau de bord</div>;
      case "planning":
        return <div>Planning Page</div>;
      case "salarie":
        return (
          <div>
            <div>Liste des salariés</div>
            <button onClick={() => handleNavigation("salarieDetail", "Jean Dupont", "1")}>
              Voir Jean Dupont
            </button>
          </div>
        );
      case "salarieDetail":
        return <div>Détails du salarié #{breadcrumbs[breadcrumbs.length - 1].id}</div>;
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
      <Sidebar onMenuClick={(page) => handleNavigation(page, capitalize(page))} />

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

const capitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export default ParentPage;
