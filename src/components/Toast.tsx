import { h } from 'preact'

interface ToastProps {
  message: string
  type?: 'loading' | 'error' | 'success'
}

const LoadingSpinner = () =>
  h('svg', { width: '16', height: '16', viewBox: '0 0 16 16', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
    h('circle', { cx: '8', cy: '8', r: '6', stroke: 'currentColor', 'stroke-width': '2', 'stroke-opacity': '0.3', fill: 'none' }),
    h('path', { d: 'M 8 2 A 6 6 0 0 1 14 8', stroke: 'currentColor', 'stroke-width': '2', fill: 'none', 'stroke-linecap': 'round' },
      h('animateTransform', {
        attributeName: 'transform',
        type: 'rotate',
        from: '0 8 8',
        to: '360 8 8',
        dur: '1s',
        repeatCount: 'indefinite'
      })
    )
  )

const ErrorIcon = () =>
  h('svg', { width: '16', height: '16', viewBox: '0 0 16 16', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
    h('circle', { cx: '8', cy: '8', r: '7', fill: 'currentColor' }),
    h('path', { d: 'M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5', stroke: 'white', 'stroke-width': '2', 'stroke-linecap': 'round' })
  )

export const Toast = ({ message, type = 'loading' }: ToastProps) =>
  h('div', { className: `gb-toast gb-toast-${type}` },
    type === 'loading' && h('div', { className: 'gb-toast-spinner' }, h(LoadingSpinner, null)),
    type === 'error' && h('div', { className: 'gb-toast-icon gb-toast-icon-error' }, h(ErrorIcon, null)),
    h('span', { className: 'gb-toast-message' }, message)
  )
