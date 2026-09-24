"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import CheckoutForm from "@/components/CheckoutForm";

export default function Checkout() {
  const { items, removeFromCart, updateQuantity } = useCart();

  const total = items.reduce(
    (sum, item) => sum + item.product.discountedPrice * item.quantity,
    0
  );

  return (
    <div className="p-4 w-full md:w-2/3 mx-auto flex flex-col lg:flex-row gap-2">
      <section className="mb-4 flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <div className="flex flex-col gap-4 bg-white p-4 rounded-lg">
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex flex-row gap-4 rounded-md align-middle justify-center border-b border-gray-200 p-4 bg-white h-full"
              >
                <Image
                  src={item.product.image.url}
                  alt={item.product.image.alt || item.product.title}
                  width={100}
                  height={100}
                  className="h-24 w-24 object-cover rounded-xl"
                />
                <div className="flex flex-col flex-1">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.product.title}
                  </h2>
                  <p className="text-gray-800 font-medium">
                    NOK{item.product.discountedPrice}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <label
                      htmlFor={`qty-${item.product.id}`}
                      className="text-sm text-gray-600"
                    >
                      Qty:
                    </label>
                    <input
                      id={`qty-${item.product.id}`}
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.product.id, Number(e.target.value))
                      }
                      className="w-16 text-center border-2 rounded-md text-gray-800 "
                    />
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-red-600 font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <p className="text-xl font-bold text-gray-800 dark:text-gray-800">
            Total: NOK{total.toFixed(2)}
          </p>
        </div>
      </section>
      <section className="flex flex-col text-center">
        <p className="text-gray-800 dark:text-white text-lg">
          Please review your order and provide your shipping information.
        </p>
        <CheckoutForm />
      </section>
    </div>
  );
}
