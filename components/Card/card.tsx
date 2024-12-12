import React from 'react'
import styles from './Card.module.css'
import {Product} from '@/app/models/interfaces'


export default function Card({ title, price, description, image, rating}:Product){

    return (
        <div className={styles.card}>
          <img src={image} alt={title} className={styles.image} />
          <div className={styles.content}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.price}>{price}</p>
            <p className={styles.description}>{description}</p>
            <div className={styles.rating}>
            </div>
          </div>
        </div>
      );
    
    }

      
