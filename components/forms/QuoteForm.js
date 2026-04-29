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
        <form onSubmit={handleSubmit} className="card space-y-4">
            <h2 className="text-lg font-semibold text-brand-dark">
            Request a Quote
            </h2>

            {/* Client Info */}
            <div className="form-section">
                <label className="label">Name</label>
                <input name="clientName" value={form.clientName} onChange={handleChange} className="input"/>
            </div>

            <div className="form-section">
                <label className="label">Email</label>
                <input name="clientEmail" value={form.clientEmail} onChange={handleChange} className="input"/>
            </div>

            <div className="form-section">
                <label className="label">Phone</label>
                <input name="clientPhone" value={form.clientPhone} onChange={handleChange} className="input"/>
            </div>

            {/* Address */}

            <div className="form-section">
                <label className="label">Street</label>
                <input name="street" value={form.street} onChange={handleChange} className="input"/>
            </div>
            <div className="form-section">
                <label className="label">City</label>
                <input name="city" value={form.city} onChange={handleChange} className="input"/>
            </div>
            <div className="form-section">
                <label className="label">State</label>
                <input name="state" value={form.state} onChange={handleChange} className="input"/>
            </div>
            <div className="form-section">
                <label className="label">Zip</label>
                <input name="zip" value={form.zip} onChange={handleChange} className="input"/>
            </div>
            
            
            

            {/* Services */}
            <div>
                <p className="section-title">Select Services:</p>

                <div className="space-y-1">
                    {services.map((service) => (
                        <label key={service.id} className="flex items-center gap-2 text-sm">
                            <input
                            type="checkbox"
                            checked={form.serviceIds.includes(Number(service.id))}
                            onChange={() => handleServiceChange(service.id)}
                            />
                            {service.name}
                        </label>
                    ))}
                </div>
            </div>

            <button type="submit" className="btn btn-primary w-full">
                {loading ? "Submitting..." : " Submit Request"}
            </button>
        </form>
    );
}