import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [errors, setErrors] = useState<ContactFormErrors>({});

  type ContactFormErrors = {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };

  function validateForm(values: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): ContactFormErrors {
    const errors: ContactFormErrors = {};

    if (values.name.trim().length < 3) {
      errors.name = "Name must be at least 3 characters long";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (values.subject.trim().length < 3) {
      errors.subject = "Subject must be at least 3 characters long";
    }
    if (values.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters long";
    }
    return errors;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validateForm({ name, email, subject, message });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
  }
  return (
    <form
      className="flex flex-col gap-2 p-1 w-full  md:w-2/3 mx-auto mb-2 mt-2"
      onSubmit={handleSubmit}
    >
      <label htmlFor="name">Your Full Name</label>
      <input
        type="text"
        id="name"
        name="name"
        className="border p-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {errors.name && <p className="text-red-500">{errors.name}</p>}

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        className="border p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <p className="text-red-500">{errors.email}</p>}

      <label htmlFor="subject">Subject</label>
      <input
        type="text"
        id="subject"
        name="subject"
        className="border p-2"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      {errors.subject && <p className="text-red-500">{errors.subject}</p>}

      <label htmlFor="message">Send us a Message</label>
      <textarea
        id="message"
        name="message"
        className="border p-2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      {errors.message && <p className="text-red-500">{errors.message}</p>}

      <button type="submit" className="bg-blue-500 text-white p-2 rounded-sm">
        Send
      </button>
    </form>
  );
}
