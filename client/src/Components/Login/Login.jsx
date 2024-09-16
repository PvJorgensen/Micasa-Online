import React, { useState } from 'react'
import { useAuth } from '../../Providers/AuthProvider'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import { useSupabase } from '../../Providers/SupabaseProvider'
import styles from './login.module.scss'

export const Login = () => {
  const { supabase } = useSupabase() // Giver mig adgang til min backend
  const { loginData, setLoginData } = useAuth() //Henter og opdatere login-data fra AuthProvider
  const navigate = useNavigate() // Bruges  til at navigere når formen bliver sumbittet
  const { register, handleSubmit, formState: { errors } } = useForm() // håndtere formularens tilstand og validereing
  const [loginError, setLoginError] = useState(null) // Kontrollere om der skal sendes fejl besked eller ikke


const handleLogin = async ({ email, password }) => {
  // Forsøg at logge brugeren ind med Supabase
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // Log fejlmeddelelse til konsol og vis bruger en fejlmeddelelse
    console.error("error logging in:", error)
    setLoginError("Login fejlede. Tjek din email og password.") // Sæt fejlmeddelelse
  } else {
    // Login var succesfuld
    // Gem autentificeringstoken i sessionStorage
    sessionStorage.setItem("supabase.auth.token", JSON.stringify(data))
    // Opdater login-data i AuthProvider
    setLoginData(data)
    // Ryd fejlmeddelelse
    setLoginError(null)
    // Naviger til forsiden
    setTimeout(() => {
      navigate('/')
    }, 0)
  }
}


return (
  <>
    {/* Hvis brugeren ikke er logget ind, vis login-formularen */}
    {!loginData || !loginData.user ? (
      <form onSubmit={handleSubmit(handleLogin)} className={styles.loginWrapper}>
        <section className={styles.loginBox}>
          <div>
            <h2>Login</h2>
            <h3>Indtast dit brugernavn og password</h3>
            <input 
              placeholder='Indtast din email' 
              type="email" 
              id="email"
              {...register("email", { required: true })} // Registrer inputfeltet med React Hook Form
            />
            {/* Vis fejlmeddelelse, hvis email-feltet ikke er udfyldt */}
            {errors.email && <span>This field is required</span>}
          </div>
          <div>
            <input 
              placeholder='Indtast dit password' 
              type="password" 
              id="password"
              {...register("password", { required: true })} // Registrer inputfeltet med React Hook Form
            />
            {/* Vis fejlmeddelelse, hvis password-feltet ikke er udfyldt */}
            {errors.password && <span>This field is required</span>}
          </div>

          {/* Vis login-fejlmeddelelse, hvis der er nogen */}
          {loginError && <div className={styles.errorMessage}>{loginError}</div>}
          
          <div className={styles.loginContainer}>
            <button type="submit">LOGIN</button> {/* Login-knap */}
          </div>
        </section>
      </form>
    ) : null} {/* Hvis brugeren er logget ind, vis ikke login-formularen */}
  </>
)

}