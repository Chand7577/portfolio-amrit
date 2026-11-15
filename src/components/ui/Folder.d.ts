import { CSSProperties, ReactNode } from 'react';

export type FolderItem =
  | string
  | number
  | { title?: string; description?: string }
  | { image: string; title?: string; alt?: string }
  | { content: ReactNode };

export interface FolderProps {
  items?: (FolderItem | ReactNode)[];
  children?: ReactNode;
  label?: string;
  mode?: 'flap' | 'book';
  variant?: 'solid' | 'glass' | 'matte';
  color?: string;
  paperColor?: string;
  tabPosition?: 'left' | 'center' | 'right';
  layout?: 'spread' | 'stack' | 'row';
  size?: number;
  openOn?: 'click' | 'hover';
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onItemClick?: (item: FolderItem | ReactNode, index: number) => void;
  onItemDrop?: (item: FolderItem | ReactNode, index: number, inside: boolean) => void;
  draggable?: boolean;
  zoomOnClick?: boolean;
  peek?: boolean;
  intro?: boolean;
  tilt?: number;
  bounce?: number;
  speed?: number;
  frost?: number;
  closeOnOutsideClick?: boolean;
  theme?: 'dark' | 'light';
  className?: string;
  style?: CSSProperties;
}

declare function Folder(props: FolderProps): ReactNode;
export default Folder;
