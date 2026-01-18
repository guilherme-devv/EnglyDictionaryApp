import { useState, useEffect, useRef } from 'react';

export function useViewModel<TViewModel, TState>(
  viewModelOrFactory: TViewModel | (new (...args: any[]) => TViewModel),
  getState: (vm: TViewModel) => TState,
  subscribe: (vm: TViewModel, listener: (state: TState) => void) => () => void,
  ...constructorArgs: any[]
): [TState, TViewModel] {
  const viewModelRef = useRef<TViewModel>(undefined);

  if (!viewModelRef.current) {
    if (typeof viewModelOrFactory === 'function') {
      viewModelRef.current = new (viewModelOrFactory as new (...args: any[]) => TViewModel)(...constructorArgs);
    } else {
      viewModelRef.current = viewModelOrFactory;
    }
  }

  const viewModel = viewModelRef.current;

  const [state, setState] = useState<TState>(() => getState(viewModel));

  useEffect(() => {
    const unsubscribe = subscribe(viewModel, (newState) => {
      setState(newState);
    });

    return unsubscribe;
  }, [viewModel, subscribe]);

  return [state, viewModel];
}
