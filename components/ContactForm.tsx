import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    // Handle form submission logic here
  }
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        className="border p-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        className="border p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="message">Message</label>
      <textarea
        id="message"
        name="message"
        className="border p-2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button type="submit" className="bg-blue-500 text-white p-2">
        Send
      </button>
    </form>
  );
}
