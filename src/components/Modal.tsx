import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

export function Modal({children}: {children?: ReactNode}) {
  const modalRoot = document.getElementById('portal-root');

  useEffect(() => {
    let scrollbarWidth = (window.innerWidth - document.body.clientWidth) + 'px';
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = scrollbarWidth;
    
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
  }
  }, [])

  return modalRoot ? createPortal(
    (<div className="fixed w-full h-full bg-black/20 top-0 z-50">
      { children }
    </div>),
    modalRoot
  ) : null
}