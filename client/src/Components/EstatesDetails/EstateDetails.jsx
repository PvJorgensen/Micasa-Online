import React, { useEffect, useState } from 'react'
import { useSupabase } from '../../Providers/SupabaseProvider';
import styles from './estatesdetails.module.scss'
import { useParams } from 'react-router-dom';
import like from '../../assets/Images/iconLike.png'
import floorplan from '../../assets/Images/IconFloorplan.png'
import location from '../../assets/Images/IconLocation.png'
import camera from '../../assets/Images/Cameraicon.png'

export const EstateDetails = () => {
    const [estatesDetails, setEstatesDetails] = useState([]);
    const { supabase } = useSupabase();
    const { estate_id } = useParams();

    const getEstatesDetails = async () => {
        if (supabase) {
            try {
                const { data, error } = await supabase
                    .from("estates")
                    .select("id, address, price, gross, payout, num_rooms, floor_space, city_id, num_clicks, type_id(name), image_url, cities(zipcode,name), energy_label_id(id,letter,color)")
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

    const formatPrice = (price) => new Intl.NumberFormat('da-DK').format(price);

  return (
    <>
        <section className={styles.topImg}>
            <img src={estatesDetails.image_url} alt="" />
        </section>
        <section className={styles.contentWrapper}>
            <section className={styles.topElements}>
                <section>
                <h2>{estatesDetails.address}</h2>
                <p>{estatesDetails.cities?.zipcode} {estatesDetails.cities?.name}</p>
                <p>{estatesDetails.type_id?.name} | {estatesDetails.floor_space} | {estatesDetails.num_rooms}</p>
                <p>Set {estatesDetails.num_clicks} gange</p>
                </section>
                <section className={styles.iconContainer}>
                    <img src={camera} alt="fotos" />
                    <img src={floorplan} alt="Floorplan" />
                    <img src={location} alt="Location" />
                    <img src={like} alt="Like" />
                </section>
                <section>
                    <div  className={styles.flexPrices}>
                        <p>Kontantpris:</p>
                        <h3>{formatPrice(estatesDetails.price)}</h3>
                    </div>
                    <div className={styles.smallPrices}>
                        <p>Udbetaling: {formatPrice(estatesDetails.payout)}</p>
                        <p>Ejerudgift per måned: {formatPrice(estatesDetails.gross)}</p>
                    </div>
                </section>
            </section>
            <section className={styles.mainContainer}>
            <div className={styles.boxStyles}>
                <p>Hej</p>
                <p>Dav</p>
            </div>
            <div className={styles.boxStyles}>
                <p>Hej</p>
                <p>Dav</p>
            </div>
            <div className={styles.boxStyles}>
                <p>Hej</p>
                <p>Dav</p>
            </div>
        </section>
        </section>


    </>
  )
}
