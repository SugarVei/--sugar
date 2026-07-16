import { CheckCircle2, CircleAlert } from 'lucide-react'
export interface ToastMessage { id: number; text: string; kind?: 'success' | 'error' }
export function Toast({ toast }: { toast: ToastMessage | null }) { if (!toast) return null; return <div className={`toast ${toast.kind ?? 'success'}`} role="status">{toast.kind === 'error' ? <CircleAlert size={18} /> : <CheckCircle2 size={18} />}{toast.text}</div> }
