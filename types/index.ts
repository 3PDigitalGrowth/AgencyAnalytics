export type DateRange = "7d" | "28d" | "30d" | "90d" | "12m";

export interface KPICard {
  title: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon?: string;
  color?: string;
}

export interface ChartDataPoint {
  date: string;
  [key: string]: string | number;
}

export interface ClientConfig {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  website?: string;
}

export interface IntegrationStatus {
  type: string;
  isActive: boolean;
  lastSync?: string;
}
