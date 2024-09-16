import React, { useState } from 'react';
import styles from './frontcomments.module.scss';
import { useForm } from "react-hook-form";

export const FrontComments = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    if (supabase) {
      const { data: supabaseData, error } = await supabase
        .from("contact_messages")
        .insert([{
        id: data.Id,
        name: data.Name,
        message: data.Message,
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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  return (
    <>
      <div className={styles.commentWrapper}>
        <section className={styles.headline}>
          <h1>Det her siger vores kunder</h1>
        </section>
        <section className={styles.commentsBox}>
          Fetchede Comments
        </section>
        <section 
          className={`${styles.dropMenu} ${isOpen ? styles.active : ''}`}
        >
          <p onClick={toggleDropdown}>Skriv en anmeldelse</p>
          <div className={styles.dropdownContent}>
            <form>
            <input type="text" placeholder='Indtast dit navn'/>
            <input type="text" placeholder='Indtast din email'/>
            <textarea name="" id="" placeholder='Skriv en anmeldelse'></textarea>
            <section className={styles.btnContainer}>
                <button>Send</button>
            </section>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};
