import React from 'react'
import styles from './nav.module.scss'
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'
import søg from '../../assets/Images/Search.png'

export const Nav = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
  return (
    <nav className={styles.navMain}>
        <ul>
            <li><Link to='/Forside'>Forside</Link></li>
            <li><Link to='/Boliger'>Boliger</Link></li>
            <li><Link to='/Kontakt'>Kontakt</Link></li>
            <li><Link to='/Login'>Login</Link></li>
        </ul>
        <form onSubmit={handleSubmit}>
            <input 
                type="search" 
                name="" 
                id="" 
                placeholder='Indtast søgeord' 
                {...register("search", {required: true})}
            />
            <img src={søg} alt="" />
        </form>
    </nav>
  )
}
