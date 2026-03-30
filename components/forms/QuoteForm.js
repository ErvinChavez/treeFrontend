import { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import client from "@/lib/apollo";

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
        <form onSubmit={handleSubmit} className="space-y-4">
            /** Client Info */
            <input name="clientName" placeholder="Name" value={form.clientName} onChange={handleChange} className="input"/>
            <input name="clientEmail" placeholder="Email" onChange={handleChange} className="input"/>
            <input name="clientPhone" placeholder="Phone" onChange={handleChange} className="input"/>

            /** Address */
            <input name="street" placeholder="Street" onChange={handleChange} className="input"/>
            <input name="city" placeholder="City" onChange={handleChange} className="input"/>
            <input name="state" placeholder="State" onChange={handleChange} className="input"/>
            <input name="zip" placeholder="ZIP" onChange={handleChange} className="input"/>

            /** Services */
            <div>
                <p className="font-semibold mb-2">Select Services:</p>
                {services.map((service) => (
                    <label key={service.id} className="block">
                        <input
                          type="checkbox"
                          onChange={() => handleServiceChange(service.id)}
                        />
                        <span className="ml-2">{service.name}</span>
                    </label>
                ))}
            </div>

            <button>
                {loading ? "Submitting..." : " Submit Request"}
            </button>
        </form>
    );
}