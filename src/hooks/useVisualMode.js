import React, { useState } from 'react';

export default function userVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  return { mode };
}