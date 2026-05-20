import { useAppStore } from '../../store/appStore';
import './PaywallOverlay.css';

interface PaywallOverlayProps {
  onClose: () => void;
}

export default function PaywallOverlay({ onClose }: PaywallOverlayProps) {
  const activatePremium = useAppStore((s) => s.activatePremium);

  const handleTrial = () => {
    activatePremium();
    onClose();
  };

  return (
    <div className="paywall-overlay">
      <div className="paywall-content">
        <div className="paywall-emoji">🔓</div>
        <h2 className="paywall-title">Ещё 40+ затей<br />по твоему профилю</h2>
        <p className="paywall-sub">Разблокируй подписку и получи доступ ко всем активностям</p>
        <button className="btn-primary paywall-cta" onClick={handleTrial}>
          попробовать бесплатно 7 дней →
        </button>
        <p className="paywall-price">затем 299 ₽/мес</p>
        <button className="btn-ghost" onClick={onClose}>
          вернуться завтра
        </button>
      </div>
    </div>
  );
}
