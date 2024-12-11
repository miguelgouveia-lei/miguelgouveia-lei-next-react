'use client';
import React from 'react';
import {Product} from '../app/models/interfaces'
import useSWR from 'swr';
import Card from '@/components/Card/card'

export default function Products() {

    const fetcher = (url: string) => fetch(url).then(res => res.json())
    const { data: products, error, isLoading } = useSWR<Product[], Error>('/api/products');
    
    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading...</div>;
    if (!products) return <div>No data available</div>;

    return <>
        {products.map((product) => (
            <Card 
                image={product.image}
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price} 
                description={product.description}  
                rating={product.rating} 
                
                />
        ))}

        
    </>
}

