import {
  TreeRemovalIcon,
  TreeTrimmingIcon,
  StumpGrindingIcon,
  LandClearingIcon,
  EmergencyIcon,
  FirewoodIcon,
  DefaultTreeIcon,
} from "@/components/icons/ServiceIcons";

const ICON_RULES = [
  { keywords: ["emergency", "storm"], icon: EmergencyIcon },
  { keywords: ["stump"], icon: StumpGrindingIcon },
  { keywords: ["firewood", "wood delivery"], icon: FirewoodIcon },
  { keywords: ["land clearing", "clearing", "lot clearing"], icon: LandClearingIcon },
  { keywords: ["trim", "prune", "pruning", "shaping"], icon: TreeTrimmingIcon },
  { keywords: ["removal", "remove", "felling"], icon: TreeRemovalIcon },
];

export function getServiceIcon(serviceName = "") {
  const name = serviceName.toLowerCase();

  for (const rule of ICON_RULES) {
    if (rule.keywords.some((keyword) => name.includes(keyword))) {
      return rule.icon;
    }
  }

  return DefaultTreeIcon;
}