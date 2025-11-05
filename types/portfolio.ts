export type ProjectType = "digital-creative" | "website" | "automation";

export interface Project {
  id: string;
  title: string;
  type: ProjectType;
  description: string;
  longDescription?: string;
  images: string[];
  tags: string[];
  liveUrl?: string;
  featured?: boolean;
  year?: number;
}

export const projectTypes: { value: ProjectType; label: string }[] = [
  { value: "digital-creative", label: "Digital Creatives" },
  { value: "website", label: "Web Development" },
  { value: "automation", label: "AI Automations" },
];

