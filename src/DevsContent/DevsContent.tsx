import React from 'react';

export interface DevsContentProps {
  children: React.ReactNode;
}

export default class DevsContent extends React.Component<DevsContentProps> {
  render() {
    const { children } = this.props;
    return <div className="devs_content">
      {children}
    </div>;
  }
}