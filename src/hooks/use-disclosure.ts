import { useState } from 'react';

/**
 * Props for the useDisclosure hook.
 */
type UseDisclosureProps = {
  /**
   * If true, the disclosure is controlled and open.
   */
  isOpen?: boolean;

  /**
   * If true, the disclosure is initially open.
   */
  defaultIsOpen?: boolean;

  /**
   * Callback fired when the disclosure is closed.
   */
  onClose?(): void;

  /**
   * Callback fired when the disclosure is opened.
   */
  onOpen?(): void;
};

/**
 * Custom hook to manage the open/close state of a disclosure component.
 *
 * @param props - The properties to control the disclosure state.
 * @returns An object containing the state and functions to control the disclosure.
 */
export function useDisclosure(props?: UseDisclosureProps) {
  const {
    isOpen: controlledIsOpen,
    defaultIsOpen = false,
    onClose: onCloseProp,
    onOpen: onOpenProp,
  } = props || {};

  const [isOpen, setIsOpen] = useState(defaultIsOpen);
  const isControlled = controlledIsOpen !== undefined;
  const resolvedIsOpen = isControlled ? controlledIsOpen : isOpen;

  const onClose = () => {
    if (!isControlled) {
      setIsOpen(false);
    }
    onCloseProp?.();
  };

  const onOpen = () => {
    if (!isControlled) {
      setIsOpen(true);
    }
    onOpenProp?.();
  };

  const onToggle = () => {
    if (isControlled) {
      return controlledIsOpen ? onClose() : onOpen();
    }
    setIsOpen(prev => !prev);
  };

  return {
    isOpen: resolvedIsOpen,
    onOpen,
    onClose,
    onToggle,
    isControlled,
  };
}
