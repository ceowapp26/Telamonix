interface TechItem {
  name: string;
  icon: React.ReactNode;
}

export interface TechStack {
  category: string;
  icon: React.ReactNode;
  languages: TechItem[];
  frameworks: {
    name: string;
    items: TechItem[];
  }[];
  tools: TechItem[];
}
