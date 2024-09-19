import React from 'react'
import styles from './likedestates.module.scss'

export const LikedEstates = () => {
  return (
    <section className={styles.adminContainer}>
        <section>
        <h2>Din side</h2>
        <h3>Adminstration af anmeldelser</h3>
        </section>
        <section className=''>
            <div></div>
            <div></div>
            <div></div>
        </section>
        <section>
            <p>Du er logget ind som admin</p>
        </section>
    </section>
  )
}
