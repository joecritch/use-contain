import { useRef } from 'react';
import * as useRectModule from './useRect';
import { useContain } from './';
import { renderHook } from '@testing-library/react-hooks';

jest.mock('./useRect');

let { useRect } = useRectModule;

useRect.mockReturnValue({
  rect: {},
});

describe('useContain', () => {
  it('returns a new ref by default', () => {
    let { result } = renderHook(() => useContain());
    let { ref } = result.current;
    let div = document.createElement('div');
    ref.current = div;
  });

  it('uses a ref, if provided', () => {
    let div = document.createElement('div');
    let { result } = renderHook(() => {
      let ref = useRef(div);
      return useContain({
        ref,
      });
    });
    expect(result.current.ref.current).toBe(div);
  });

  it('constrains by height', () => {
    useRect.mockReturnValue({
      rect: {
        width: 500,
        height: 300,
      },
    });

    let { result } = renderHook(() => {
      return useContain();
    });

    expect(result.current.dimensions).toMatchObject({
      width: 300,
      height: 300,
    });
  });

  it('constrains by width', () => {
    useRect.mockReturnValue({
      rect: {
        width: 300,
        height: 500,
      },
    });

    let { result } = renderHook(() => {
      return useContain();
    });

    expect(result.current.dimensions).toMatchObject({
      width: 300,
      height: 300,
    });
  });

  it('constrains by height, with a custom aspect ratio', () => {
    let aspectRatio = 16 / 9;
    let width = 600;
    let height = 300;

    useRect.mockReturnValue({
      rect: {
        width,
        height,
      },
    });

    let { result } = renderHook(() => {
      return useContain({
        aspectRatio,
      });
    });

    expect(result.current.dimensions).toMatchObject({
      width: height * aspectRatio,
      height,
    });
  });

  it('constrains by width, with a custom aspect ratio', () => {
    useRect.mockReturnValue({
      rect: {
        width: 300,
        height: 500,
      },
    });

    let { result } = renderHook(() => {
      return useContain({
        aspectRatio: 16 / 9,
      });
    });

    expect(result.current.dimensions).toMatchObject({
      width: 300,
      height: 300 / (16 / 9),
    });
  });
});
