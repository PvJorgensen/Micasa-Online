import React, { useEffect, useState } from 'react';
import styles from './slide.module.scss';
import Slide1 from '../../assets/Images/Slideshow/slide-1.jpg';
import Slide2 from '../../assets/Images/Slideshow/slide-2.jpg';
import Slide3 from '../../assets/Images/Slideshow/slide-3.jpg';
import Slide4 from '../../assets/Images/Slideshow/slide-4.jpg';
import Slide5 from '../../assets/Images/Slideshow/slide-5.jpg';
import Slide6 from '../../assets/Images/Slideshow/slide-6.jpg';

export const MainSlideShow = () => {
  const slideImages = [
    { url: Slide1, caption: 'Slide 1' },
    { url: Slide2, caption: 'Slide 2' },
    { url: Slide3, caption: 'Slide 3' },
    { url: Slide4, caption: 'Slide 4' },
    { url: Slide5, caption: 'Slide 5' },
    { url: Slide6, caption: 'Slide 6' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slideImages.length]);

  return (
    <section className={styles.slideShowContainer}>
      <div
        className={styles.slidesWrapper}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slideImages.map((slide, index) => (
          <div key={index} className={styles.slide}>
            <img src={slide.url} alt={slide.caption} />
          </div>
        ))}
      </div>
    </section>
  );
};
