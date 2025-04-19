import React from "react";
import Switch from './Switch/Switch'
import MissionsList from './MissionsList/MissionsList'

import styles from './MissionsWrapper.module.scss'

const MissionsWrapper = () => {
  return (
    <div className={styles.missionWwrapper}>
      <Switch />
      <MissionsList />
    </div>
  )
}

export default MissionsWrapper
