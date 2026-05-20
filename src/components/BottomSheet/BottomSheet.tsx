import { useEffect, useRef } from 'react';
import './BottomSheet.css';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function BottomSheet({ open, onClose, children, title }: BottomSheetProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="bs-overlay" ref={overlayRef} onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}>
      <div className="bs-sheet">
        <div className="bs-handle" />
        {title && <h3 className="bs-title">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
