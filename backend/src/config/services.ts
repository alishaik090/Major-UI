export const SUPPORTED_ORGANS = ["brain", "kidney", "retina"] as const;

export type Organ = (typeof SUPPORTED_ORGANS)[number];

export interface ServiceDefinition {
  label: string;
  url: string;
}

/** Add a new organ by extending this map and setting its environment variable. */
export const SERVICES: Record<Organ, ServiceDefinition> = {
  brain: { label: "Brain", url: process.env.BRAIN_API?.trim() ?? "" },
  kidney: { label: "Kidney", url: process.env.KIDNEY_API?.trim() ?? "" },
  retina: { label: "Retina", url: process.env.RETINA_API?.trim() ?? "" },
};

export function isOrgan(value: string): value is Organ {
  return SUPPORTED_ORGANS.includes(value as Organ);
}
