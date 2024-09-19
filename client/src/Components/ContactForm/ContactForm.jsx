import React, { useEffect, useState } from 'react';
import { useSupabase } from '../../Providers/SupabaseProvider';
import { useForm } from "react-hook-form";
import styles from './contactform.module.scss'

export const ContactForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [successMessage, setSuccessMessage] = useState('');
  const [employee, setEmployee] = useState([]);
  const { supabase } = useSupabase();

  const getEmployee = async () => {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from("employees")
          .select("id, firstname, lastname");
        if (error) {
          throw error;
        }
        setEmployee(data);
      } catch (error) {
        console.error("Error loading employees:", error.message);
      }
    }
  };

  useEffect(() => {
    getEmployee();
  }, [supabase]);

  const onSubmit = async (data) => {
    if (supabase) {
      const { data: supabaseData, error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: data.name,
            employee_id: data.employee_id,
            message: data.message,
            created_at: new Date(),
          },
        ]);

      if (error) {
        console.error('Error sending message', error);
        setSuccessMessage('Der var en fejl i afsendelsen af beskeden');
      } else {
        setSuccessMessage('Din besked er nu blevet sendt!');
        reset();
      }
    }
  };

  return (
    <section className={styles.contactForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Kontakt</h1>
        <h3>Udfyld og send formularen og vi vil hurtigst muligt besvare dine spørgsmål.</h3>
        <label htmlFor="name">Navn:</label>
        <input
          type="text"
          id="name"
          placeholder="Indtast dit navn"
          {...register('name', { required: true })}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Indtast din Email"
          {...register('email', { required: true })}
        />

        <label htmlFor="employee">Vælg medarbejder:</label>
        <select id="employee" {...register('employee_id', { required: true })}>
          <option value="" disabled>Vælg en medarbejder</option>
          {employee &&
            employee.map((item) => (
              <option key={item.id} value={item.id}>
                {item.firstname} {item.lastname}
              </option>
            ))}
        </select>

        <label htmlFor="message">Besked:</label>
        <textarea
          id="message"
          placeholder="Skriv din besked her"
          {...register('message', { required: true })}
        />
        <div className={styles.btnContainer}>
        <button type="submit">Send besked</button>
        </div>
        {successMessage && <p>{successMessage}</p>}
      </form>
      <section>
        <p>Find os her:</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2170.211097975522!2d9.964887877171055!3d57.04792609150065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464932b6a2b7696b%3A0x861634f2bf524040!2s%C3%98ster%20Uttrup%20Vej%201%2C%209000%20Aalborg!5e0!3m2!1sda!2sdk!4v1726575458970!5m2!1sda!2sdk"
          width="600"
          height="500"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps"/>
      </section>
    </section>
  );
};
