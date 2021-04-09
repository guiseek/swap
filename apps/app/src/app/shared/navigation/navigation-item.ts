export interface NavigationItem {
  id?: string | number;
  label: string;
  route: string;
  expanded?: boolean;
  children?: NavigationItem[];
}
