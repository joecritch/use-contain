import { useRef } from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import { useRect } from './useRect';
import { renderHook } from '@testing-library/react-hooks';

jest.mock('@juggle/resize-observer');

ResizeObserver.mockImplementation(() => ({
  observe: () => null,
  disconnect: () => null,
}));

describe('useRect', () => {
  it('throws error if no ref is provided', () => {
    let { result } = renderHook(() => {
      return useRect();
    });
    expect(result.error).toEqual(Error('No ref provided to useRect.'));
  });

  // TODO: finish useRect tests
});
