import styles from './MissionCard.module.scss'

type MissionCardProps = {
    date: string
    time: string
    type: string
  }
  
  const MissionCard = ({ date, time, type }: MissionCardProps) => {
    return (
      <div className={styles.missionCard}>
        <div>
          <h4>{date}</h4>
          <p>{time}</p>
        </div>
        <div>
          <span>{type}</span>
        </div>
      </div>
    )
  }
  
  export default MissionCard
  