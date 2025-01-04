'use client';
import React, { useEffect, useState } from 'react';
import { Product } from '../models/interfaces';
import useSWR from 'swr';
import Card from '@/components/Card/card';
import Cart from '@/components/Cart/cart';

export default function Products() {
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("ascending"); // ascending ou descending
    const [selectedCategory, setSelectedCategory] = useState("all"); // Categoria selecionada
    const [produtosFilt, setProdutosFilt] = useState<Product[]>([]);
    const [cart, setCart] = useState<Product[]>([]);
    const [isStudent, setIsStudent] = useState(false);
    const [coupon, setCoupon] = useState('');
    const [purchaseMessage, setPurchaseMessage] = useState('');
    const [totalCost, setTotalCost] = useState(0);

    const fetcher = (url: string) => fetch(url).then(res => res.json()).catch(error => console.error('Erro:', error));
    const { data: products, error, isLoading } = useSWR<Product[], Error>('api/products', fetcher);

    useEffect(() => {
        if (products) {
            let filteredProducts = products;

        
            // Filtro de pesquisa
            filteredProducts = filteredProducts.filter((product) =>
                product.title.toLowerCase().includes(search.toLowerCase())
            );

            // Ordenação por preço
            filteredProducts.sort((a, b) => {
                if (sortOrder === "ascending") return a.price - b.price;
                if (sortOrder === "descending") return b.price - a.price;
                return 0;
            });

            setProdutosFilt(filteredProducts);
        }
    }, [search, products, sortOrder, selectedCategory]);

    useEffect(() => {
        const cart = localStorage.getItem("cart");
        if (cart) {
            setCart(JSON.parse(cart));
        }
    }, []);

    useEffect(() => {
        const updatedTotalCost = cart.reduce((acc, item) => acc + item.price, 0);
        setTotalCost(updatedTotalCost);
    }, [cart]);

    const addCart = (produto: Product) => {
        const newCarinho = [...cart, produto];
        setCart(newCarinho);
        localStorage.setItem("cart", JSON.stringify(newCarinho));
    };

    const buy = () => {
        fetch("https://deisishop.pythonanywhere.com/buy/", {
            method: "POST",
            body: JSON.stringify({
                products: cart.map(product => product.id),
                name: "", // Coloque o nome do cliente se necessário
                student: isStudent,
                coupon: coupon,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        }).then(response => {
            console.log(response);
            setCart([]); // Limpar carrinho após compra
            localStorage.setItem('cart', JSON.stringify([]));
            setPurchaseMessage('Compra realizada com sucesso!');
        }).catch(() => {
            setPurchaseMessage('Erro ao realizar a compra.');
            console.log("Erro ao comprar");
        });
    };

    const removeFromCart = (id: number) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading...</div>;
    if (!products) return <div>No data available</div>;

    return (
        <>
            <div id="searchContainer">
                <input
                    type="text"
                    placeholder="Pesquisar produtos..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    id="searchInput"
                />

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    id="sortOrder"
                >
                    <option value="ascending">Preço: Menor para Maior</option>
                    <option value="descending">Preço: Maior para Menor</option>
                </select>

            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>

            {produtosFilt.map((product) => (
                
                <Card
                    key={product.id}
                    image={product.image}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    description={product.description}
                    addCart={() => addCart(product)}
                    rating={product.rating}
                />
            ))}
        </div>
            <Cart
                cartItems={cart}
                totalPrice={totalCost}
                isStudentDiscount={isStudent}
                toggleStudentDiscount={setIsStudent}
                discountCode={coupon}
                applyDiscountCode={setCoupon}
                confirmationMessage={purchaseMessage}
                processPurchase={buy}
                removeCartItem={removeFromCart}
            />
        </>
    );
}
