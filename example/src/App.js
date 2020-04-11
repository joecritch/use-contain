import React, { useRef } from 'react';
import { useContain } from 'use-contain';

const App = () => {
  // Example 1
  let ref1 = useRef();
  const { dimensions } = useContain({
    ref: ref1,
  });

  // Example 2
  let ref2 = useRef();
  const { dimensions: dimensions2 } = useContain({
    ref: ref2,
  });
  let ref2b = useRef();
  const { dimensions: dimensions2b } = useContain({
    ref: ref2b,
    aspectRatio: 16 / 9,
  });

  return (
    <div className="app">
      <div className="app-descCol">
        <div className="app-header">
          <div className="app-title">useContain</div>
          <div className="app-desc">
            <p>
              a simple react hook, which takes a parent element and an aspect
              ratio, and outputs a width and height for the child element.
            </p>
          </div>
          <div className="app-creds">
            <p>
              <a href="https://twitter.com/joecritch"> started by @joecritch</a>
            </p>
          </div>
        </div>
      </div>
      <div className="app-demos">
        <p className="app-demoLabel">a basic example:</p>
        <div
          className="parent"
          ref={ref1}
          style={{
            height: '20vw',
          }}
        >
          <div
            className="child"
            style={{
              width: dimensions?.width || 400,
              height: dimensions?.height || 400,
            }}
          >
            {dimensions &&
              `${parseInt(dimensions.width, 10)} x ${parseInt(
                dimensions.height,
                10
              )}`}
            <br />
            (1:1)
          </div>
        </div>
        <p className="app-demoLabel">a nested example:</p>
        <div
          className="parent"
          ref={ref2}
          style={{
            height: '20vw',
          }}
        >
          <div
            className="child"
            ref={ref2b}
            style={{
              resize: 'both',
              width: dimensions2?.width || 400,
              height: dimensions2?.height || 400,
            }}
          >
            <div
              className="grandchild"
              style={{
                width: dimensions2b?.width || 400,
                height: dimensions2b?.height || 400,
              }}
            >
              {dimensions2b &&
                `${parseInt(dimensions2b.width, 10)} x ${parseInt(
                  dimensions2b.height,
                  10
                )}`}
              <br />
              (16:9)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
