export interface Lead {
  lead_id: string;
  duplicate_of: string | any;
  source: string;
  first_name: string;
  last_name: string;
  email: string;
  cell_phone: string;
  home_phone: string;
}