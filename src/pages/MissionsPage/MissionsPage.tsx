import Style from './MissionsPage.module.scss'

interface MisionsPageProps {
    ff: string;
}

export const MisionsPage: React.FC<MisionsPageProps> = () => {
    
    return (
        <>
            <div className={Style.missionsContainer}>
                <ul className={Style.MissionsList}>

                </ul>
            </div>
        </>
    );
}