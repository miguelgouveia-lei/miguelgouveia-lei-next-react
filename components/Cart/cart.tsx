import React from 'react';
import styles from '@/components/Cart/cart.module.css';
import CardCar from '../Card/CardCar';

// Define o tipo dos itens no cesto
interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface CartProps {
  cartItems: CartItem[];
  totalPrice: number;
  isStudentDiscount: boolean;
  toggleStudentDiscount: (value: boolean) => void;
  discountCode: string;
  applyDiscountCode: (value: string) => void;
  confirmationMessage: string;
  processPurchase: () => void;
  removeCartItem: (id: number) => void;
}

export default function Cart({
  cartItems,
  totalPrice,
  isStudentDiscount,
  toggleStudentDiscount,
  discountCode,
  applyDiscountCode,
  confirmationMessage,
  processPurchase,
  removeCartItem,
}: CartProps) {
  return (
    <>
      <section id="cart" className={styles.cartTitle}>
        <h2>Itens no Cesto</h2>
      </section>

      <section className={styles.cartItems}>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <CardCar
              key={`${item.id}-${index}`}
              id={item.id}
              title={item.title}
              price={item.price}
              image={item.image}
              onRemove={removeCartItem} // Função de remoção
            />
          ))
        ) : (
          <p className={styles.emptyCart}>O seu cesto está vazio</p>
        )}
      </section>

      <section className={styles.cartSummary}>
        <section className={styles.totalCost}>
          <p className={styles.totalCostText}>
            Total a pagar: {totalPrice.toFixed(2)} €
          </p>
          <p className={styles.studentDiscount}>
            És estudante?{' '}
            <input
              type="checkbox"
              id="student-checkbox"
              name="studentDiscount"
              checked={isStudentDiscount}
              onChange={(e) => toggleStudentDiscount(e.target.checked)}
            />
          </p>
          <p className={styles.discountCode}>
            Código de desconto:
            <input
              type="text"
              id="discount-code-input"
              name="discountCode"
              value={discountCode}
              onChange={(e) => applyDiscountCode(e.target.value)}
            />
          </p>
          <button
            className={styles.purchaseButton}
            onClick={processPurchase}
            disabled={cartItems.length === 0}
          >
            Finalizar Compra
          </button>
          {confirmationMessage && (
            <p className={styles.confirmationMessage}>{confirmationMessage}</p>
          )}
        </section>
      </section>
    </>
  );
}
