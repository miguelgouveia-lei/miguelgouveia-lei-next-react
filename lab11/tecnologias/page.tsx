import React from 'react';
import tecnologias from '@/app/data/tecnologias.json';
import Card from '@/components/Card/card'

const Tecnologias = () => {
    return (
      <div>
        <h1>Tecnologias</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {tecnologias.map((tecnologia, index) => (
            <Card
              key={index}
              title={tecnologia.title}
              image={tecnologia.image}
              description={tecnologia.description}
              rating={tecnologia.rating}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default Tecnologias;