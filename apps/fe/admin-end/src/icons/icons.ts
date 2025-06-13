import {
  LucideIconData,
  LayoutGrid,
  Calendar,
  List,
  Table,
  UserCircleIcon,
  Box,
  ChartPie,
  FileStack,
  Plug,
  ChevronDown,
} from 'lucide-angular';

export type IconKey =
  | 'layoutGrid'
  | 'calendar'
  | 'usercircle'
  | 'list'
  | 'table'
  | 'page'
  | 'piechart'
  | 'boxcube'
  | 'plugin'
  | 'chevrondown';

export const iconMap: Record<IconKey, LucideIconData> = {
  layoutGrid: LayoutGrid,
  calendar: Calendar,
  usercircle: UserCircleIcon,
  list: List,
  table: Table,
  page: FileStack,
  piechart: ChartPie,
  boxcube: Box,
  plugin: Plug,
  chevrondown: ChevronDown,
};
