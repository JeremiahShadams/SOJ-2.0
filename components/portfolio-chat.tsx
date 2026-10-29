'use client'

import SojChatPopup from '@/components/soj-chat-popup'

export default function PortfolioChat({ onClose }: { onClose?: () => void }) {
  return <SojChatPopup onClose={onClose || (() => {})} />
}
