"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ProductImage({
  url,
  alt,
}: {
  url: string;
  alt: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleEsc);
  }, [isOpen]);

  return (
    <div>
      <Image
        src={url}
        alt={alt}
        width={300}
        height={200}
        className="mx-auto h-50 w-50 md:h-100 md:w-100 object-cover rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <Image
            src={url}
            alt={alt}
            width={600}
            height={400}
            className="object-cover"
          />
          <button
            className="absolute top-4 right-4 text-white text-2xl cursor"
            onClick={() => setIsOpen(false)}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}
