import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './admincomments.module.scss';
import { useSupabase } from '../../Providers/SupabaseProvider';
import { useAuth } from '../../Providers/AuthProvider';

const months = [
  'Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 
  'Juli', 'August', 'September', 'Oktober', 'November', 'December'
];

export const AdminComments = () => {
  const [userComments, setUserComments] = useState([]); 
  const { supabase } = useSupabase();
  const { loginData, setLoginData } = useAuth();
  const navigate = useNavigate();

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
    if (loginData?.user) {
      getUserComments();
    }
  }, [supabase, loginData]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      setLoginData(null);
      navigate('/');
    }
  };

  if (!loginData?.user) {
    return <p>Du skal være logget ind for at se denne side.</p>; 
  }

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
            <button onClick={handleLogout}>Log ud</button>
        </section>
    </section>
  );
};
