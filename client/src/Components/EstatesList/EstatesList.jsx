import React, { useEffect, useState } from 'react';
import { useSupabase } from '../../Providers/SupabaseProvider';
import styles from './estateslist.module.scss';
import { Link } from 'react-router-dom';

export const EstatesList = () => {
  const [cardsData, setCardsData] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [filterOption, setFilterOption] = useState('');
  const { supabase } = useSupabase();

  const getCardsData = async () => {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('estates')
          .select(
            'id, address, price, num_rooms, floor_space, city_id, type_id(name), image_url, cities(zipcode,name), energy_label_id(id,letter,color)'
          );
        if (error) {
          throw error;
        }

        // filtrere property typer
        let filteredData = data;
        if (filterOption) {
          filteredData = filteredData.filter(
            (item) => item.type_id.name === filterOption
          );
        }

        // Sortere data baseret på hvilken sortering man vælger
        if (sortOption === 'Pris - Stigende') {
          filteredData.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'Pris - Faldende') {
          filteredData.sort((a, b) => b.price - a.price);
        } else if (sortOption === 'Antal kvadratmeter') {
          filteredData.sort((a, b) => b.floor_space - a.floor_space);
        } else if (sortOption === 'Liggetid - Faldende') {
          filteredData.sort((a, b) => b.id - a.id);
        }

        setCardsData(filteredData);
      } catch (error) {
        console.error('Error loading cards data:', error.message);
      }
    }
  };

  useEffect(() => {
    getCardsData();
  }, [supabase, sortOption, filterOption]); // Fetcher data hvergang man sortere eller filtrere

  const formatPrice = (price) => new Intl.NumberFormat('da-DK').format(price);

  return (
    <div className={styles.cardsWrapper}>
      <div className={styles.filter}>
        <h2>Boliger til salg</h2>
        <div className={styles.selectContainer}>
          <select
            name="Sorter"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="" disabled>
              Sorter
            </option>
            <option value="Pris - Stigende">Pris - Stigende</option>
            <option value="Pris - Faldende">Pris - Faldende</option>
            <option value="Antal kvadratmeter">Antal kvadratmeter</option>
            <option value="Liggetid - Faldende">Liggetid - Faldende</option>
          </select>
          <select
            name="Filter"
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
          >
            <option value="" disabled>
              Filter
            </option>
            <option value="Villa">Villa</option>
            <option value="Ejerlejelighed">Ejerlejelighed</option>
            <option value="Andelsbolig">Andelsbolig</option>
          </select>
        </div>
      </div>
      <div className={styles.Container}>
        {cardsData.slice(0, 9).map((item) => (
          <section key={item.id} className={styles.card}>
            <Link to={`./${item.id}`}>
            <img src={item.image_url} alt="Primary Img" />
            </Link>
            <section className={styles.infoBox}>
              <div className={styles.topSection}>
                <p>{item.address}</p>
                <p style={{ backgroundColor: item.energy_label_id.color }}>
                  {item.energy_label_id.letter}
                </p>
              </div>
              <p>
                {item.cities.zipcode} {item.cities.name}
              </p>
              <p>{item.type_id.name}</p>
              <p>
                {item.num_rooms} værelser, {item.floor_space} m2
              </p>
            </section>
            <section className={styles.priceContainer}>
              <h2>{formatPrice(item.price)} DKK</h2>
            </section>
          </section>
        ))}
      </div>
    </div>
  );
};
