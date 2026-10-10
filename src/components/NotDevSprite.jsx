import './NotDevSprite.css'

export default function NotDevSprite({ size = 32, animated = true, className = '' }) {
  return (
    <div
      className={`notdev-sprite ${animated ? 'notdev-sprite--animated' : ''} ${className}`}
      style={{ width: size, height: size }}
      aria-label="notDev.ai sprite logo"
    >
      <img
        src="/notdev-ai-sprite.png"
        alt="notDev.ai sprite"
        className="notdev-sprite__image"
        width={size}
        height={size}
      />
      {animated && <span className="notdev-sprite__pulse" aria-hidden="true" />}
    </div>
  )
}
