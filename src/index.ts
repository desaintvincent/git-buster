/// <reference types="chrome" />
// This script gets injected into any opened page
// whose URL matches the pattern defined in the manifest
// (see "content_script" key).
// Several foreground scripts can be declared
// and injected into the same or different pages.

import { Options } from './types'
import { mountOverview } from './overviewComponent'

let options: Options
let configError: string | null = null

const EXTENSION_NAME = 'git-buster'
const EXT_PAGE_ID = 'git-buster-page'
const EXT_SIDEBAR_BTN_ID = 'git-buster-sidebar-btn'
const URL_ANCHOR = 'git-buster'
let syntheticPageVisible = false // mirrors internal component visibility
let sidebarObserverStarted = false

const loadOptions = async (): Promise<Options> => {
    // @ts-ignore
    const options = await chrome.storage.sync.get([EXTENSION_NAME])
    const scoppedOptions = options[EXTENSION_NAME] ?? {}
    console.log('[git-buster] raw stored options', scoppedOptions)

    const parseProjects = (val: any): { parsed?: any; error?: string } => {
        if (val == null) { return { error: 'Missing projects configuration in extension options.' } }
        let raw = val
        if (typeof raw === 'string') {
            try { raw = JSON.parse(raw) } catch { return { error: 'projects option is not valid JSON.' } }
        }
        if (!Array.isArray(raw)) { return { error: 'projects should be an array.' } }
        const isValid = raw.every(g => g && typeof g === 'object' && typeof g.name === 'string' && g.name.trim().length && Array.isArray(g.projects) && g.projects.every((p: any) => typeof p === 'string' && p.trim().length))
        if (!isValid) { return { error: 'projects array items must be { name: string; projects: string[] } with non-empty strings.' } }
        return { parsed: raw }
    }

    const { parsed, error } = parseProjects(scoppedOptions.projects)
    if (error) { configError = error; console.error('[git-buster] config error:', error) }

    return {
        ...scoppedOptions,
        projects: parsed, // only set if valid; otherwise undefined so component can react
    }
}

const createOrGetPageContainer = (): HTMLElement => {
  let page = document.getElementById(EXT_PAGE_ID) as HTMLElement | null
  if (!page) {
    page = document.createElement('div')
    page.id = EXT_PAGE_ID
    const containerTarget = document.querySelector('.content-wrapper') || document.body
    containerTarget.appendChild(page)
  }
  return page
}

// Helper to update button color based on visibility
const updateSidebarButtonState = () => {
  const btn = document.getElementById(EXT_SIDEBAR_BTN_ID)
  if (btn) {
    ;(btn as HTMLElement).style.background = syntheticPageVisible ? '#094d8b' : '#1f78d1'
    btn.setAttribute('aria-expanded', syntheticPageVisible ? 'true' : 'false')
  }
}

const ensureSidebarButton = () => {
  if (!options?.baseUrl || !document.location.href.startsWith(options.baseUrl)) { return }
  if (document.getElementById(EXT_SIDEBAR_BTN_ID)) { return }

  const topBarContainer = document.querySelector('.top-bar-container')
  const sidebarContainer = document.querySelector('.super-sidebar-nav') || document.querySelector('.nav-sidebar') || document.querySelector('.sidebar') || document.querySelector('.layout-page .aside');

  let target: Element | null = null
  let mode: 'topbar' | 'sidebar' = 'sidebar'
  if (topBarContainer) { target = topBarContainer; mode = 'topbar' } else if (sidebarContainer) { target = sidebarContainer }
  if (!target) { return }

  const item = document.createElement('button')
  item.type = 'button'
  item.id = EXT_SIDEBAR_BTN_ID
  item.style.cursor = 'pointer'
  item.style.display = 'flex'
  item.style.alignItems = 'center'
  item.style.gap = '6px'
  item.style.padding = mode === 'topbar' ? '4px 12px' : '6px 10px'
  item.style.margin = mode === 'topbar' ? '0 0 0 auto' : '4px 8px'
  item.style.borderRadius = '6px'
  item.style.fontSize = '13px'
  item.style.lineHeight = '18px'
  item.style.fontWeight = '500'
  item.style.background = '#1f78d1'
  item.style.color = '#fff'
  item.style.border = '1px solid rgba(255,255,255,0.18)'
  item.style.boxShadow = 'inset 0 0 0 1px rgba(255,255,255,0.15)'
  item.style.userSelect = 'none'
  item.style.whiteSpace = 'nowrap'
  item.title = 'Toggle Git Buster Overview'
  item.innerHTML = `<span>Git Buster</span>`

  item.addEventListener('mouseenter', () => { item.style.filter = 'brightness(1.1)' })
  item.addEventListener('mouseleave', () => { item.style.filter = 'none' })

  item.addEventListener('click', e => {
    e.preventDefault()
    const next = !syntheticPageVisible
    if (typeof (window as any).gitBusterSetVisible === 'function') {
      (window as any).gitBusterSetVisible(next)
    }
  })

  if (mode === 'topbar') {
    const parentIsFlex = getComputedStyle(target).display.includes('flex')
    if (parentIsFlex) {
        item.style.marginLeft = 'auto'
        target.appendChild(item)
    } else {
        const wrapper = document.createElement('div')
        wrapper.style.display = 'flex'
        wrapper.style.marginLeft = 'auto'
        wrapper.appendChild(item)
        target.appendChild(wrapper)
    }
  } else {
    const insertBefore = Array.from(target.children).find(ch => ch.textContent?.match(/help|feedback/i))
    if (insertBefore) { target.insertBefore(item, insertBefore) } else { target.appendChild(item) }
  }
  updateSidebarButtonState()
  // Auto-open if hash already set handled by component initialVisible
}

const startSidebarObserver = () => {
  if (sidebarObserverStarted) { return }
  sidebarObserverStarted = true
  const observer = new MutationObserver(() => {
    if (!document.getElementById(EXT_SIDEBAR_BTN_ID)) {
      ensureSidebarButton()
      updateSidebarButtonState()
    }
  })
  observer.observe(document.body, { childList: true, subtree: true })
}

const init = async () => {
  options = await loadOptions();
  if (configError) {
    const container = createOrGetPageContainer()
    container.innerHTML = `<div style="padding:24px;font-family:system-ui,sans-serif;color:#b00020;background:#2b1d1f;border:1px solid #b00020;border-radius:6px;max-width:640px;margin:24px auto;">`+
      `<h2 style=\"margin-top:0;color:#ffb4c1;font-size:18px;\">Git Buster configuration error</h2>`+
      `<p style=\"line-height:1.4;margin:8px 0;\">${configError}</p>`+
      `<p style=\"font-size:12px;opacity:.8;margin:12px 0 0;\">Update the extension options (projects JSON) and reload the page.</p>`+
      `</div>`
    ensureSidebarButton()
    updateSidebarButtonState()
    return
  }
  if (!options.enable || !options.baseUrl || !document.location.href.startsWith(options.baseUrl)) {
    return
  }
  syntheticPageVisible = window.location.hash.replace('#','') === URL_ANCHOR
  // Provide callback for component to update button color & local mirror
  ;(window as any).gitBusterOnVisibleChange = (v: boolean) => { syntheticPageVisible = v; updateSidebarButtonState() }
  ensureSidebarButton()
  startSidebarObserver()
  const container = createOrGetPageContainer()
  mountOverview(container, options, syntheticPageVisible)
  updateSidebarButtonState()
  // Listen to hash changes only for button state (component also listens)
  window.addEventListener('hashchange', () => {
    const shouldBeVisible = window.location.hash.replace('#','') === URL_ANCHOR
    if (shouldBeVisible !== syntheticPageVisible && typeof (window as any).gitBusterSetVisible === 'function') {
      (window as any).gitBusterSetVisible(shouldBeVisible)
    }
  })
  // Keyboard shortcut Ctrl+Q
  const isEditableTarget = (el: EventTarget | null): boolean => {
    if (!(el instanceof HTMLElement)) return false
    const tag = el.tagName.toLowerCase()
    return tag === 'input' || tag === 'textarea' || el.isContentEditable
  }
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && !e.altKey && !e.shiftKey && e.key.toLowerCase() === 'q') {
      if (isEditableTarget(e.target)) { return }
      e.preventDefault()
      if (typeof (window as any).gitBusterSetVisible === 'function') {
        (window as any).gitBusterSetVisible(!syntheticPageVisible)
      }
    }
  })
}

init()
