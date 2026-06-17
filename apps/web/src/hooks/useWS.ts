// src/hooks/useWS.ts — WebSocket client with auto-reconnect
// Uses the Vite dev server proxy (/ws → ws://localhost:3001/ws)
import { useEffect, useRef, useCallback } from 'react'

// Build WS URL: in dev use proxy path, in prod use env var
function getWsUrl(): string {
  const envUrl = import.meta.env.VITE_WS_URL as string | undefined
  if (envUrl) return envUrl
  // Use current page host → goes through Vite proxy
  const proto = location.protocol === 'https:' ? 'wss:' : 'ws:'
  return `${proto}//${location.host}/ws`
}

const WS_URL = getWsUrl()

type Handler = (payload: unknown) => void

export function useWS(wsId: string | null, handlers: Record<string, Handler>) {
  const ws   = useRef<WebSocket | null>(null)
  const hMap = useRef(handlers)
  hMap.current = handlers

  const send = useCallback((type: string, payload: unknown = {}) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type, wsId, payload }))
    }
  }, [wsId])

  useEffect(() => {
    if (!wsId) return
    let reconnectTimer: ReturnType<typeof setTimeout>
    let alive = true

    function connect() {
      const sock = new WebSocket(WS_URL)
      ws.current = sock

      sock.onopen = () => {
        sock.send(JSON.stringify({ type: 'workspace:join', wsId, payload: { avatar: 0 } }))
      }

      sock.onmessage = (e) => {
        try {
          const msg = JSON.parse(e.data)
          hMap.current[msg.type]?.(msg.payload)
        } catch {}
      }

      sock.onclose = () => {
        if (alive) reconnectTimer = setTimeout(connect, 2000)
      }

      sock.onerror = () => sock.close()
    }

    connect()
    return () => {
      alive = false
      clearTimeout(reconnectTimer)
      ws.current?.send(JSON.stringify({ type: 'workspace:leave', wsId, payload: {} }))
      ws.current?.close()
    }
  }, [wsId])

  return { send }
}
