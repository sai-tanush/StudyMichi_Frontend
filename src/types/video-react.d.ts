declare module 'video-react' {
  import { ComponentType, ReactNode } from 'react';

  export interface PlayerProps {
    playsInline?: boolean;
    src?: string;
    onEnded?: () => void;
    children?: ReactNode; // Allows passing React components as children
    className?: string; // Optional className for styling
    [key: string]: unknown;
  }

  export const Player: ComponentType<PlayerProps>;
}
