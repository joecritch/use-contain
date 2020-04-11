import { useLayoutEffect, useRef, useState } from 'react';
import { useRect } from './useRect';

/**
 * Calculate an inner elements width & height
 * from an aspect ratio, and a parents measurements
 * `object-fit: contain` style
 */
export let useContain = ({ aspectRatio = 1 / 1, ref } = {}) => {
  // Use a fresh ref is none was provided
  let newRef = useRef(null);
  ref = ref == null ? newRef : ref;

  // Get the bounding rect of the element
  let { rect } = useRect(ref);

  // useLayoutEffect(() => {
  let availableWidth = rect.width;
  let availableHeight = rect.height;
  let width, height;

  if (availableWidth / availableHeight > aspectRatio) {
    // Constrain by height
    height = availableHeight;
    width = availableHeight * aspectRatio;
  } else {
    // Constrain by width
    width = availableWidth;
    height = availableWidth / aspectRatio;
  }

  let dimensions = null;

  if (width && height) {
    dimensions = {
      width,
      height,
    };
  }

  return {
    ref,
    dimensions,
  };
};
