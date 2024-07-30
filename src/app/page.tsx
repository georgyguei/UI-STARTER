'use client';

import PinInput from '@/components/ui/form/input/pin';
import PinInputField from '@/components/ui/form/input/pin/field';
import useBorderAnimation from '@/hooks/useOnRenderAnimation';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function Home() {
  const [state, setState] = useState('');

  const { animationClass } = useBorderAnimation(state);

  return (
    <main
      className={cn(
        'm-5 space-y-2 overflow-x-auto rounded-xl border p-3 font-[inter,_sans-serif]',
        animationClass
      )}
    >
      <div>Home page! {state}</div>
      <div className="flex items-center gap-2">
        <PinInput
          manageFocus={true}
          onChange={event => {
            setState(event.target.value);
          }}
          onPaste={event => {
            event.preventDefault();
            const value = event.clipboardData.getData('text');
            setState(value);
          }}
          className="border-green-500"
        >
          <PinInputField className="border-dashed" onChange={event => {}} />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </div>
    </main>
  );
}
