import React, { useEffect, useState } from 'react';
import styles from './cards.module.scss';
import { useSupabase } from '../../Providers/SupabaseProvider';

export const FrontCards = () => {
    const [cardsData, setCardsData] = useState([]);
    const { supabase } = useSupabase();

    const getCardsData = async () => {
        if (supabase) {
            try {
                const { data, error } = await supabase
                    .from("estates")
                    .select("id, address, price, num_rooms, floor_space, city_id, type_id(name), image_url, cities(zipcode,name), energy_label_id(id,letter,color)");
                if (error) {
                    throw error;
                }

                const sortedData = data.sort(() => 0.5 - Math.random());
                setCardsData(sortedData);
            } catch (error) {
                console.error("Error Loading CardsData:", error.message);
            }
        }
    };

    useEffect(() => {
        getCardsData();
    }, [supabase]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('da-DK').format(price);
    };

    return (
        <div className={styles.cardsWrapper}>
            <div className={styles.Container}>
                {cardsData && cardsData.slice(0, 3).map((item) => (
                    <section key={item.id} className={styles.card}>
                        <img src={item.image_url} alt="Primary Img" />
                        <section className={styles.infoBox}>
                            <div className={styles.topSection}>
                            <p>{item.address}</p>
                            <p style={{ backgroundColor: item.energy_label_id.color }}>{item.energy_label_id.letter}</p>
                            </div>
                            <p>{item.cities.zipcode} {item.cities.name}</p>
                            <p>{item.type_id.name}</p>
                            <p>{item.num_rooms} værelser, {item.floor_space} m2</p>
                        </section>
                        <section className={styles.priceContainer}>
                            <h2>{formatPrice(item.price)} DKK</h2>
                        </section>
                    </section>
                ))}
            </div>
        </div>
    );
}
