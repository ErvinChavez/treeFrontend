import Link from "next/link";
import { getServiceIcon } from "@/lib/serviceIcon";

export default function ServiceCard({ service, compact = false }) {
  const Icon = getServiceIcon(service.name);
  const anchorId = `service-${service.id}`;

  if (compact) {
    return (
      <Link
        href={`/services#${anchorId}`}
        className="card card-interactive flex flex-col items-center text-center gap-2 py-6"
      >
        <Icon className="w-8 h-8 text-brand-accent" />
        <h2 className="text-subtitle">{service.name}</h2>
      </Link>
    );
  }

  return (
    <div id={anchorId} className="card card-interactive space-y-1 scroll-mt-24">
      <div className="flex items-center gap-3">
        <Icon className="w-7 h-7 text-brand-accent shrink-0" />
        <h2 className="text-title">{service.name}</h2>
      </div>
      <p className="text-muted">{service.description}</p>
    </div>
  );
}