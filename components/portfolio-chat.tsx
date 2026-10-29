'use client'

import SojChatPopup from '@/components/soj-chat-popup'

export default function PortfolioChat({
  onClose,
  dockPosition = 'center',
  onToggleDock,
}: {
  onClose?: () => void
  dockPosition?: 'center' | 'corner'
  onToggleDock?: () => void
}) {
  return (
    <SojChatPopup
      onClose={onClose || (() => {})}
      dockPosition={dockPosition}
      onToggleDock={onToggleDock}
    />
  )
}
