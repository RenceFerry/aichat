'use client'

import React, { ChangeEvent, TextareaHTMLAttributes } from 'react';

interface AutoResizeTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxHeight?: string;
  minHeight?: string;
}

export const AutoResizeTextarea = React.forwardRef<HTMLTextAreaElement, AutoResizeTextareaProps>(
  ({ maxHeight = '200px', minHeight = '50px', className = '', ...props }, ref) => {
    const handleResize = (e: ChangeEvent<HTMLTextAreaElement>) => {
      const textarea = e.target;
      
      // Reset height to allow proper scroll height calculation
      textarea.style.height = minHeight;
      
      // Calculate the scroll height
      const scrollHeight = textarea.scrollHeight;
      
      // Convert maxHeight to pixels for comparison
      const maxHeightPx = parseInt(maxHeight);
      
      // Set the new height, bounded by maxHeight
      textarea.style.height = Math.min(scrollHeight, maxHeightPx) + 'px';
    };

    return (
      <textarea
        ref={ref}
        onChange={handleResize}
        style={{
          resize: 'none',
          minHeight: minHeight,
          maxHeight: maxHeight,
          overflowY: 'auto',
        }}
        className={`${className}`}
        {...props}
      />
    );
  }
);

AutoResizeTextarea.displayName = 'AutoResizeTextarea';