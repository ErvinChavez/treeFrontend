import { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

//GraphQL mutation
const CREATE_QUOTE = gql`
  mutation CreateQuoteRequest(
    $clientName: String!,
    $clientEmail: String!,
    $clientPhone: String!,
    $street: String!,
    $city: String!,
    $state: String!,
    $zip: String!,
    $serviceIds: [Int]
  ) {
    createQuoteRequest(
      clientName: $clientName,
      clientEmail: $clientEmail,
      clientPhone: $clientPhone,
      street: $street,
      city: $city,
      state: $state,
      zip: $zip,
      serviceIds: $serviceIds
    ) {
      id
      status  
    } 
  }
`;

export default function QuoteForm({ services }) {
    const [form, setForm] = useState({
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        serviceIds: [],
    });

    const [createQuote, { loading }] = useMutation(CREATE_QUOTE, {
        onCompleted: () => {
            alert("Quote request submitted!");
            setForm({
                clientName: "",
                clientEmail: "",
                clientPhone: "",
                street: "",
                city: "",
                state: "",
                zip: "",
                serviceIds: [],
            });
        },
        onError: (err) => {
            console.error("FULL ERROR:", err);
            alert(err.message);
        },
    });

    //handle input changes
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    //handle checkbox selection
    const handleServiceChange = (id) => {
        const numId = Number(id);
        setForm((prev) => {
            const exists = prev.serviceIds.includes(numId);
            return {
                ...prev,
                serviceIds: exists
                  ? prev.serviceIds.filter((s) => s !== numId)
                  : [...prev.serviceIds, numId],
            };
        });
    };

    //submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Form Data:", form);

        await createQuote({
            variables: {
                ...form,
                serviceIds: form.serviceIds.map(Number),
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="stack">

            {/* Client Info */}
            <div className="stack-sm">
                <input name="clientName" placeholder="Name" value={form.clientName} onChange={handleChange} className="input"/>
                <input name="clientEmail" placeholder="Email" value={form.clientEmail} onChange={handleChange} className="input"/>
                <input name="clientPhone" placeholder="Phone" value={form.clientPhone} onChange={handleChange} className="input"/>
            </div>

            {/* Address */}
            <div className="stack-sm">
                <input name="street" placeholder="Street" value={form.street} onChange={handleChange} className="input"/>
                <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="input"/>
                <input name="state" placeholder="State" value={form.state} onChange={handleChange} className="input"/>
                <input name="zip" placeholder="ZIP" value={form.zip} onChange={handleChange} className="input"/>
            </div>
            
            {/* Services */}
            <div className="stack-xs">
                <p className="section-title">Select Services:</p>

                {services.map((service) => (
                    <label key={service.id} className="flex items-center gap-2 text-body">
                        <input
                        type="checkbox"
                        checked={form.serviceIds.includes(Number(service.id))}
                        onChange={() => handleServiceChange(service.id)}
                        />
                        {service.name}
                    </label>
                ))}
            </div>

            <button type="submit" className="btn btn-primary">
                {loading ? "Submitting..." : " Submit Request"}
            </button>
        </form>
    );
}