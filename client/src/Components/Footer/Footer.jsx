import React, { useState } from 'react';
import styles from './footer.module.scss';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useSupabase } from '../../Providers/SupabaseProvider';
import add from '../../assets/Images/FieldIcon.png';

export const Footer = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { supabase } = useSupabase();
  const [ successMessage, setSuccessMessage ] = useState();

  const onSubmit = async (data) => {
    if (supabase) {
      const { data: supabaseData, error } = await supabase
        .from("newsletter_emails")
        .insert([{
          email: data.Email,
          created_at: new Date()
        }]);

      if (error) {
        console.error("Error joining newsletter", error);
        setSuccessMessage("Der var en fejl i din tilmelding");
      } else {
        setSuccessMessage("Du er nu tilmeldt Nyhedsbrevet!")
        reset();
      }
    }
  };

  return (
    <footer>
      <section>
        <h2>MiCasa</h2>
        <p>Øster Uttrupvej 5</p>
        <p>9000 Aalborg</p>
        <p>Email: info@homelands.dk</p>
        <p>Telefon: +45 1122 3344</p>
      </section>

      <section>
        <ul>
          <li><Link to='/'>Forside</Link></li>
          <li><Link to='/Boliger'>Boliger</Link></li>
          <li><Link to='/Kontakt'>Kontakt</Link></li>
          <li><Link to='/Login'>Login</Link></li>
        </ul>
      </section>

      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Få drømmehuset i din indbakke</h3>
        <p>Tilmeld dig til vores nyhedsbrev og få nye <br /> boliger sendt direkte til din indbakke</p>
        <section className={styles.formSection}>
          <img src={add} alt="" />
          <input {...register("Email", { required: true })} placeholder='Indtast din email' />
          <button type='submit'>Tilmeld</button>
          
        </section>
        {successMessage && <p>{successMessage}</p>}
      </form>
    </footer>
  );
};
