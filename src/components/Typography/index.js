import React from "react";

const Typography = ({ variant, className, children, ...rest }) => {
  const Component = variant || 'p'

  return <Component className={className} {...rest}>{children}</Component>
};

export default Typography;
