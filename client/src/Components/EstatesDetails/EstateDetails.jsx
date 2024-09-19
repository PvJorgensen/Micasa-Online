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
                    .select("id, address, description, price, gross, net, cost, payout, num_rooms, num_floors, floor_space, ground_space, basement_space, year_construction, year_rebuilt, city_id, num_clicks, type_id(name), image_url, cities(zipcode,name), energy_label_id(id,letter,color), employees(id,firstname,lastname,position,image_url,phone,email)")
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
                <div className={styles.firstRow}>
                    <p>Sagsnr.</p>
                    <p>Boligareal</p>
                    <p>Grundareal</p>
                    <p>Antal rum</p>
                    <p>Antal plan</p>
                </div>
                    <div className={styles.scndRow}>
                        <p>{estatesDetails.id}</p>
                        <p>{estatesDetails.floor_space}</p>
                        <p>{estatesDetails.ground_space}</p>
                        <p>{estatesDetails.num_rooms}</p>
                        <p>{estatesDetails.num_floors}</p>
                    </div>
            </div>
            <div className={styles.boxStyles}>
                <div className={styles.firstRow}>
                    <p>Kælder</p>
                    <p>Byggeår</p>
                    <p>Ombygget</p>
                    <p>Energimærke</p>
                    <p>Liggetid</p>
                </div>
                    <div className={styles.scndRow}>
                        <p>{estatesDetails.basement_space}</p>
                        <p>{estatesDetails.year_construction}</p>
                        <p>{estatesDetails.year_rebuilt}</p>
                        <p>{estatesDetails.energy_label_id?.letter}</p>
                        <p>#</p>
                    </div>
                </div>
            <div className={styles.boxStyles}>
                <div className={styles.firstRow}>
                    <p>Kontantpris</p>
                    <p>Udbetaling</p>
                    <p>Brutto ex. ejerudgift</p>
                    <p>Netto ex. ejerudgift</p>
                    <p>Ejerudgift</p>
                </div>
                    <div className={styles.scndRow}>
                        <p>{formatPrice(estatesDetails.price)}</p>
                        <p>{formatPrice(estatesDetails.payout)}</p>
                        <p>{formatPrice(estatesDetails.gross)}</p>
                        <p>{formatPrice(estatesDetails.net)}</p>
                        <p>{formatPrice(estatesDetails.cost)}</p>
                    </div>
            </div>
        </section>
        <section className={styles.description}>
            <section className={styles.leftie}>
                <p>{estatesDetails.description}</p>
            </section>
            <section className={styles.employee}>
                <div>
                    <h3>Kontakt</h3>
                    <img src={estatesDetails.employees?.image_url} alt="" />
                    <h4>{estatesDetails.employees?.firstname} {estatesDetails.employees?.lastname}</h4>
                    <p>{estatesDetails.employees?.position}</p>
                    <p>Mobil: {estatesDetails.employees?.phone}</p>
                    <p>Email: {estatesDetails.employees?.email}</p>
                </div>
            </section>

        </section>
        </section>
    </>
  )
}
