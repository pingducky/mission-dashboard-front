import MissionCard from './MissionCard/MissionCard'

import styles from './MissionsList.module.scss'

const dummyMissions = [
  { date: 'Lundi 24 Mars', time: '09:00', type: 'Nettoyage vitres' },
  { date: 'Mardi 25 Mars', time: '14:00', type: 'Ménage réguliers' }
]

const MissionsList = () => {
  return (
    <div className={styles.missionsList}>
      {dummyMissions.map((mission, index) => (
        <MissionCard key={index} {...mission} />
      ))}
    </div>
  )
}

export default MissionsList
