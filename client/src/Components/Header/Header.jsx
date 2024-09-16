import React from 'react'
import styles from './header.module.scss'
import logo from '../../assets/Images/HeaderLogo.png'
import { Nav } from '../Navigation/Nav'
import { Link } from 'react-router-dom'

export const Header = () => {

  return (
    <header className={styles.headerMain}>
        <Link to='/Forside'><img src={logo} alt="Logo" /></Link>
        <section>
            <Nav />
        </section>
    </header>
  )
}
