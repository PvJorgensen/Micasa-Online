import React from 'react'
import styles from './nav.module.scss'
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'
import søg from '../../assets/Images/Search.png'
import { useAuth } from '../../Providers/AuthProvider'

export const Nav = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { loginData } = useAuth();
    const loggedIn = loginData?.user;
  
  
    return (
      <nav className={styles.navMain}>
        <ul>
          <li><Link to='/'>Forside</Link></li>
          <li><Link to='/Boliger'>Boliger</Link></li>
          <li><Link to='/Kontakt'>Kontakt</Link></li>
          <li>
            <Link to={loggedIn ? '/Min side' : '/Login'}>
              {loggedIn ? 'Min side' : 'Login'}
            </Link>
          </li>
        </ul>
        <form>
          <input 
            type="search" 
            placeholder='Indtast søgeord' 
            {...register("search", { required: true })}
          />
          {errors.search && <span>Søgeord er påkrævet</span>}
          <button type="submit">
            <img src={søg} alt="Search" />
          </button>
        </form>
      </nav>
    );
  };