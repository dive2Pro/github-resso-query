import React from 'react';
import { useHref, useLinkClickHandler } from 'react-router-dom';

const Link = React.forwardRef(
  ({ onClick, replace = true, state, target, to, ...rest }, ref) => {
    let href = useHref(to);
    let handleClick = useLinkClickHandler(to, {
      replace,
      state,
      target,
    });

    return (
      <a
        {...rest}
        href={href}
        onClick={async (event) => {
          onClick?.(event);
          if (!event.defaultPrevented) {
            handleClick(event);
          }
        }}
        ref={ref}
        target={target}
      />
    );
  }
);

export default Link;
