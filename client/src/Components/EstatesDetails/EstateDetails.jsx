import React, { useEffect, useState } from 'react'
import { useSupabase } from '../../Providers/SupabaseProvider';
import styles from './estatesdetails.module.scss'
import { useParams } from 'react-router-dom';

export const EstateDetails = () => {
    const [estatesDetails, setEstatesDetails] = useState([]);
    const { supabase } = useSupabase();
    const { estate_id } = useParams();

    const getEstatesDetails = async () => {
        if (supabase) {
            try {
                const { data, error } = await supabase
                    .from("estates")
                    .select("id, address, price, num_rooms, floor_space, city_id, type_id(name), image_url, cities(zipcode,name), energy_label_id(id,letter,color)")
                    .eq('id', estate_id)
                    .single()
                if (error) {
                    throw error;
                }
                setEstatesDetails(data);
            } catch (error) {
                console.error("Error Loading EstatesDetails:", error.message);
            }
        }
    };

    useEffect(() => {
        getEstatesDetails();
    }, [supabase]);
  return (
    <>
        <section className={styles.topImg}>
            <img src={estatesDetails.image_url} alt="" />
        </section>
        <section className={styles.contentWrapper}>
            <section className={styles.topElements}>
                <h2>{estatesDetails.address}</h2>
                <p>{estatesDetails.cities.zipcode} {estatesDetails.cities.name}</p>
            </section>
        </section>
    </>
  )
}
