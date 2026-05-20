import { useAppStore } from '../../store/appStore'
import './PaywallOverlay.css'

interface Props {
  onClose: () => void;
}

export default function PaywallOverlay({ onClose }: Props) {
  const setPremium = useAppStore(s => s.setPremium)

  const handleUnlock = () => {
    setPremium()
    onClose()
  }

  return (
    <div className="paywall">
      <div className="paywall-blur" />
      <div className="paywall-content">
        <div className="paywall-emoji">🔓</div>
        <h2 className="paywall-title">Ещё 40+ затей<br />по твоему профилю</h2>
        <p className="paywall-sub">Разблокируй подписку и открой все активности</p>
        <button className="btn-primary paywall-btn" onClick={handleUnlock}>
          попробовать бесплатно 7 дней
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10H16M11 5L16 10L11 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="paywall-price">затем 299 ₽/мес</p>
        <button className="btn-ghost" onClick={onClose}>вернуться завтра</button>
      </div>
    </div>
  )
}
