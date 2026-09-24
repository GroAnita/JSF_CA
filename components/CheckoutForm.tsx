import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [credit, setCredit] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const { clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!showSuccess) return;
    const timer = setTimeout(() => {
      setShowSuccess(false);
      router.push("/");
    }, 4000);
    return () => clearTimeout(timer);
  }, [showSuccess, router]);

  type ContactFormErrors = {
    name?: string;
    email?: string;
    cardNumber?: string;
    expiry?: string;
    cvc?: string;
    credit?: string;
  };

  function validateForm(values: {
    name: string;
    email: string;
    credit: string;
    cardNumber: string;
    expiry: string;
    cvc: string;
  }): ContactFormErrors {
    const errors: ContactFormErrors = {};

    if (values.name.trim().length < 3) {
      errors.name = "Name must be at least 3 characters long";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (values.credit.trim().length < 3) {
      errors.credit = "Name on credit card must be at least 3 characters long";
    }
    if (!/^\d{16}$/.test(values.cardNumber.replace(/\s/g, ""))) {
      errors.cardNumber = "Card number must be 16 digits";
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(values.expiry)) {
      errors.expiry = "Expiry must be in MM/YY format";
    } else {
      const [monthStr, yearStr] = values.expiry.split("/");
      const expieryMonths = (2000 + Number(yearStr)) * 12 + Number(monthStr);
      const now = new Date();
      const currentMonths = now.getFullYear() * 12 + (now.getMonth() + 1);
      if (expieryMonths < currentMonths) {
        errors.expiry = "Card has expired";
      } else if (expieryMonths > currentMonths + 36) {
        errors.expiry = "Card expiry date can be at most 3 years in the future";
      }
    }
    if (!/^\d{3,4}$/.test(values.cvc)) {
      errors.cvc = "CVC must be 3 or 4 digits";
    }

    return errors;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validateForm({
      name,
      email,
      credit,
      cardNumber,
      expiry,
      cvc,
    });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    setName("");
    setEmail("");
    setCredit("");
    setCardNumber("");
    setExpiry("");
    setCvc("");
    setErrors({});
    setShowSuccess(true);
    clearCart();
  }
  return (
    <>
      <form
        className="flex flex-col gap-2 p-1 w-full  md:w-2/3 mx-auto mb-2 mt-2"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Your Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="border p-2 bg-white dark:bg-blue-900"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="border p-2 bg-white dark:bg-blue-900"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}

        <label htmlFor="subject">Name on Credit Card</label>
        <input
          type="text"
          id="credit"
          name="credit"
          className="border p-2 bg-white dark:bg-blue-900"
          value={credit}
          onChange={(e) => setCredit(e.target.value)}
        />
        {errors.credit && <p className="text-red-500">{errors.credit}</p>}

        <label htmlFor="cardNumber">Card Number</label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          className="border p-2 bg-white dark:bg-blue-900"
          value={cardNumber}
          onChange={(e) => {
            const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 16);
            setCardNumber(digitsOnly.replace(/(.{4})/g, "$1 ").trim());
          }}
        />
        {errors.cardNumber && (
          <p className="text-red-500">{errors.cardNumber}</p>
        )}
        <section className="flex flex-row gap-2 mx-auto">
          <div className="flex flex-col gap-1">
            <label htmlFor="expiry">Expiry (MM/YY)</label>
            <input
              type="text"
              id="expiry"
              name="expiry"
              className="border p-2 bg-white dark:bg-blue-900 w-24"
              value={expiry}
              onChange={(e) => {
                const digitsOnly = e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 4);
                const formatted =
                  digitsOnly.length > 2
                    ? `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2)}`
                    : digitsOnly;
                setExpiry(formatted);
              }}
            />
            {errors.expiry && <p className="text-red-500">{errors.expiry}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="cvc">CVC</label>
            <input
              type="text"
              id="cvc"
              name="cvc"
              className="border p-2 bg-white dark:bg-blue-900 w-24"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
            />

            {errors.cvc && <p className="text-red-500">{errors.cvc}</p>}
          </div>
        </section>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-sm">
          Payment
        </button>
      </form>

      {showSuccess && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
          onClick={() => setShowSuccess(false)}
        >
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg text-center">
            <p className="text-gray-800 text-lg font-semibold">
              Thank you for your purchase!
            </p>
            <p className="text-gray-600 mt-2">
              Your payment has been successfully processed.
            </p>
            <p className="text-gray-600 mt-2">
              You will receive a confirmation email shortly.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
