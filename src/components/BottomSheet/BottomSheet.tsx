import React, { useEffect, useRef } from 'react'
import './BottomSheet.css'

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function BottomSheet({ open, onClose, title, children }: BottomSheetProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="bs-overlay" onClick={onClose}>
      <div className="bs-sheet" ref={ref} onClick={(e) => e.stopPropagation()}>
        <div className="bs-handle" />
        {title && <h3 className="bs-title">{title}</h3>}
        {children}
      </div>
    </div>
  )
}
