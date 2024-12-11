import React from 'react'
import styles from './card.module.css'
import {Tecnologias} from '@/app/models/interfaces'


      export default function CardTec({ title, description, image, rating}:Tecnologias){

        return (
            <div className={styles.card}>
              <img src={image} alt={title} className={styles.image} />
              <div className={styles.content}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>{description}</p>
                <div className={styles.rating}>
                </div>
              </div>
            </div>
          );
          
}
