import React from 'react';

/**
 * Overlay component renders transient messages on screen.
 * @param {{ message: string }} props
 */
export default function Overlay({ message }) {
  if (!message) return null;
  return <div className="lilithtv-overlay">{message}</div>;
}
