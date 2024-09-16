import React, { useState, useEffect } from 'react';  // Import useEffect
import styles from './frontcomments.module.scss';
import { useForm } from "react-hook-form";
import { useSupabase } from '../../Providers/SupabaseProvider';

export const FrontComments = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { supabase } = useSupabase();
  const [successMessage, setSuccessMessage] = useState("");
  const [userComments, setUserComments] = useState([]);  // Initialize comments array

  const onSubmit = async (data) => {
    if (supabase) {
      const { data: supabaseData, error } = await supabase
        .from("user_comments")
        .insert([{
          name: data.name,     // 'name' from the form
          email: data.email,   // 'email' from the form
          message: data.content, // 'content' is the message field
          created_at: new Date()
        }]);

      if (error) {
        console.error("Error sending message", error);
        setSuccessMessage("Der var en fejl i afsendelsen af beskeden");
      } else {
        setSuccessMessage("Din besked er nu blevet sendt!");
        reset(); // Reset the form after successful submission
        getUserComments(); // Fetch comments again after successful submission
      }
    }
  };

  const getUserComments = async () => {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from("user_comments")
          .select("id, name, email, message, created_at");
        if (error) {
          throw error;
        }
        const sortedData = data.sort(() => 0.5 - Math.random());
        setUserComments(sortedData);
      } catch (error) {
        console.error("Error loading comments:", error.message);
      }
    }
  };

  useEffect(() => {
    getUserComments();
  }, [supabase]);

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
        {userComments.length > 0 ? (
          userComments.map((item) => (
            <section key={item.id}>
              <p>{item.message}</p>
              <p>{item.name}</p>
            </section>
          ))
          ) : (
            <p>Ingen kommentarer endnu</p>
          )}
        </section>
        <section 
          className={`${styles.dropMenu} ${isOpen ? styles.active : ''}`}
        >
          <p onClick={toggleDropdown}>Skriv en anmeldelse</p>
          <div className={styles.dropdownContent}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input 
                type="text" 
                placeholder="Indtast dit navn" 
                {...register("name", { required: true })} 
              />
              {errors.name && <p>Navn er påkrævet</p>}
              
              <input 
                type="text" 
                placeholder="Indtast din email" 
                {...register("email", { required: true })} 
              />
              {errors.email && <p>Email er påkrævet</p>}
              
              <textarea 
                placeholder="Skriv en anmeldelse" 
                {...register("content", { required: true })} 
              />
              {errors.content && <p>Anmeldelse er påkrævet</p>}

              <section className={styles.btnContainer}>
                <button type="submit">Send</button>
              </section>
            </form>
            {successMessage && <span>{successMessage}</span>}
          </div>
        </section>
      </div>
    </>
  );
};
