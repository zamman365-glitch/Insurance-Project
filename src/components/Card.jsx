import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable Card component with optional header, footer, and hover elevation.
 */
export function Card({
  children,
  className = '',
  hoverable = false,
  as: Component = 'div',
  ...rest
}) {
  return (
    <Component
      className={`card ${hoverable ? 'card-hoverable' : ''} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Component>
  );
}

Card.Header = function CardHeader({ children, className = '', ...rest }) {
  return (
    <div className={`card-header ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
};

Card.Body = function CardBody({ children, className = '', ...rest }) {
  return (
    <div className={`card-body ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
};

Card.Footer = function CardFooter({ children, className = '', ...rest }) {
  return (
    <div className={`card-footer ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  hoverable: PropTypes.bool,
  as: PropTypes.elementType,
};

Card.Header.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Card.Body.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Card.Footer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
