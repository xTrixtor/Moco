interface NavbarItem {
  name: string;
  icon:string;
  link: string;
}

export const navBarItems: NavbarItem[] = [
  { name: "Fix-Kosten", icon:"carbon:dashboard", link: "/fixedcosts" },
  { name: "Sparziele", icon:"streamline:money-graph-analytics-business-product-graph-data-chart-analysis", link: "/goals" },
  { name: "Kosten Inspektion", icon:"material-symbols:checklist", link: "/costInspection" },
];
