declare module 'react-rating-stars-component' {
  import { FC } from 'react';

  interface ReactStarsProps {
    count?: number;
    size?: number;
    edit?: boolean;
    activeColor: string;
    emptyIcon?: JSX.Element;
    fullIcon?: JSX.Element;
    value?: number;
    onChange?: (newRating: number) => void;
  }

  const ReactStars: FC<ReactStarsProps>;

  export default ReactStars;
}
