import { useState } from 'react'

import styles from './Switch.module.scss'

const Switch = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming')

  return (
    <div className={styles.switchContainer}>
      <button 
        className={activeTab === 'upcoming' ? styles.active : ''}
        onClick={() => setActiveTab('upcoming')}
      >
        Prochaines missions
      </button>
      <button 
        className={activeTab === 'past' ? styles.active : ''}
        onClick={() => setActiveTab('past')}
      >
        Missions passées
      </button>
    </div>
  )
}

export default Switch
