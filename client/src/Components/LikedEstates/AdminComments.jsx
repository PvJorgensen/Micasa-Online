import React, { useEffect, useState } from 'react'
import styles from './admincomments.module.scss'
import { useSupabase } from '../../Providers/SupabaseProvider';

const months = [
  'Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 
  'Juli', 'August', 'September', 'Oktober', 'November', 'December'
];

export const AdminComments = () => {
  const [userComments, setUserComments] = useState([]);  // Initialize comments array
  const { supabase } = useSupabase();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day}. ${month} ${year}`;
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

  return (
    <section className={styles.adminContainer}>
        <section>
        <h2>Din side</h2>
        <h3>Adminstration af anmeldelser</h3>
        <section className={styles.comments}>
            <div className={styles.rows}>
              <h4>Title</h4>
              <h4>Dato</h4>
              <h4>Handling</h4>
            </div>
            <div>
            {userComments.length > 0 ? (
              userComments.map((item) => (
            <section key={item.id} className={styles.rows}>
              <p>{item.name}</p>
              <p>{formatDate(item.created_at)}</p>
            </section>
          ))
          ) : (
            <p>Ingen kommentarer endnu</p>
          )}
            </div>
        </section>
        </section>
        <section className={styles.logout}>
            <p>Du er logget ind som admin</p>
            <button>Log ud</button>
        </section>
    </section>
  )
}
