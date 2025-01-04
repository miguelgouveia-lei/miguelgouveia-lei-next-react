import React from 'react'
import styles from './Card.module.css'
import {Product} from '@/app/models/interfaces'



export default function Card({ id, title, price, description, image,addCart, rating}:Product){

    return (
        <div className={styles.card}>
          <img src={image} alt={title} className={styles.image} />
          <div className={styles.content}>x
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.price}>{price}</p>
            <p className={styles.description}>{description}</p>
            <div className={styles.rating}>{rating.rate} </div>
            <button className={styles.button} onClick={ () => addCart({id, title, price, image})}> +Carinho </button>
            
          </div>
        </div>
      );
  
    }


      
