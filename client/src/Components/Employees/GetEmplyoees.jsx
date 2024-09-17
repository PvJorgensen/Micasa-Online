import React, { useEffect, useState } from 'react';
import { useSupabase } from '../../Providers/SupabaseProvider';
import styles from './employees.module.scss';

export const GetEmplyoees = () => {
  const [employees, setEmployees] = useState([]);
  const { supabase } = useSupabase();

  const getEmplyoeeData = async () => {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from("employees")
          .select("id, firstname, lastname, position, image_url, phone, email");

        if (error) {
          throw error;
        } else {
          setEmployees(data);
        }
      } catch (error) {
        console.error("Error Loading Employees:", error.message);
      }
    }
  };

  useEffect(() => {
    getEmplyoeeData();
  }, [supabase]);

  return (
    <>
      <h1 className={styles.employees}>Mød vores ansatte</h1>
      <section className={styles.employeeWrapper}>
        {employees &&
          employees.slice(0, 4).map((item) => (
            <div key={item.id} className={styles.employeeContainer}>
              <div
                className={styles.imageBackground}
                style={{ backgroundImage: `url(${item.image_url})` }}
              />
              <div className={styles.employeeInfo}>
                <h3>{item.firstname} {item.lastname}</h3>
                <p>{item.position}</p>
                  <p>Telefon: {item.phone}</p>
                  <p>Email: {item.email}</p>
              </div>
            </div>
          ))
        }
      </section>
    </>
  );
};
