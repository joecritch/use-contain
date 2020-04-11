# use-contain

>

[![NPM](https://img.shields.io/npm/v/@joecritch/use-contain.svg)](https://www.npmjs.com/package/use-contain) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-contain
```

## Usage

```jsx
import React, { Component } from 'react';

import { useContain } from 'use-contain';

const Example = () => {
  const { dimensions, ref } = useContain({
    aspectRatio: 16 / 9,
  });
  return (
    <div ref={ref} style={{ width: 500, height: 500 }}>
      <div
        style={{
          width: dimensions?.width || undefined,
          height: dimensions?.height || undefined,
        }}
      >
        {dimensions && `${dimensions.width} x ${dimensions.height}`}
      </div>
    </div>
  );
};
```

## License

MIT © [joecritch](https://github.com/joecritch)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
