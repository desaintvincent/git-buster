import { JSX as PreactJSX } from 'preact'

declare global {
  namespace JSX {
    interface IntrinsicElements extends PreactJSX.IntrinsicElements {}
    interface Element extends PreactJSX.Element {}
    interface ElementClass extends PreactJSX.ElementClass {}
    interface ElementAttributesProperty extends PreactJSX.ElementAttributesProperty {}
    interface ElementChildrenAttribute extends PreactJSX.ElementChildrenAttribute {}
  }
}