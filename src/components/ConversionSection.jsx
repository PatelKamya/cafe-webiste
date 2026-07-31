import { useState } from "react";
import SectionHeading from "./SectionHeading.jsx";
import { business } from "../data/business.js";

const initialValues = {
  name: "",
  phone: "",
  orderType: "Coffee",
  message: "",
};

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.phone.trim()) errors.phone = "Phone number is required.";
  if (values.phone.trim() && values.phone.replace(/[^\d+]/g, "").length < 7) {
    errors.phone = "Enter a reachable phone number.";
  }
  return errors;
}

async function sendOrderInquiry(values) {
  await new Promise((resolve) => setTimeout(resolve, 650));
  return { ok: true, values };
}

export default function ConversionSection() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const updateValue = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus("loading");
    try {
      await sendOrderInquiry(values);
      setStatus("success");
      setValues(initialValues);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section conversion" id="order">
      <div className="section__inner conversion__grid">
        <SectionHeading
          eyebrow="Order intent"
          title="Start with DRIV-U, or send us your cafe request."
          text={`For fastest ordering, use the DRIV-U app. For direct questions, call ${business.contact.displayPhone}.`}
        />
        <form className="order-form" onSubmit={handleSubmit} noValidate>
          <label>
            Full name <span aria-hidden="true">*</span>
            <input name="name" value={values.name} onChange={updateValue} aria-invalid={Boolean(errors.name)} />
            {errors.name && <small role="alert">{errors.name}</small>}
          </label>
          <label>
            Phone number <span aria-hidden="true">*</span>
            <input
              name="phone"
              value={values.phone}
              onChange={updateValue}
              inputMode="tel"
              aria-invalid={Boolean(errors.phone)}
            />
            {errors.phone && <small role="alert">{errors.phone}</small>}
          </label>
          <label>
            Interest
            <select name="orderType" value={values.orderType} onChange={updateValue}>
              <option>Coffee</option>
              <option>Premium matcha</option>
              <option>Fresh pastries</option>
              <option>Catering question</option>
            </select>
          </label>
          <label>
            Message
            <textarea name="message" value={values.message} onChange={updateValue} rows="4" />
          </label>
          <button className="button button--primary" type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending..." : "Send request"}
          </button>
          {status === "success" && <p className="form-note form-note--success">Request received. We will contact you shortly.</p>}
          {status === "error" && <p className="form-note form-note--error">Something went wrong. Please call us directly.</p>}
        </form>
      </div>
    </section>
  );
}
