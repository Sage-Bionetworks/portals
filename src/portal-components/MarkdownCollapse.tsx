import React, { useState, useEffect, useRef } from 'react'
import MarkdownSynapse, { MarkdownSynapseProps } from 'synapse-react-client/dist/containers/MarkdownSynapse'
import { displayToast } from 'synapse-react-client/dist/containers/ToastMessage'
import { Collapse, SafeAnchor } from 'react-bootstrap'

export type MarkdownCollapseProps = {
  // The text that should be shown.  If not given, will default to "full text"
  textDescription?: string 
  showCopyPlainText?: boolean
} & MarkdownSynapseProps

/**
 * Wraps a MarkdownSynapse in a Collapse area, with customizable text description.
 * Will pass down all properties to the MarkdownSynapse component, so this can be used in
 * the portal detail pages.
 * @param props 
 */
const MarkdownCollapse = (props: MarkdownCollapseProps) => {
  const [show, setShow] = useState(false)
  const [wordCount, setWordCount] = useState<number>()
  const markdownRef = useRef<MarkdownSynapse>(null)
  const getMarkdownTextContent = () => {
    return markdownRef?.current?.markupRef?.current?.textContent
  }
  useEffect(() => {
    setTimeout(() => {
      const textContent = getMarkdownTextContent()
      if (textContent) {
        setWordCount(textContent.split(' ').length)
      }
    }, 1000)
  }, [])
  const { textDescription = "full text", showCopyPlainText } = props
  return ( 
    <div className="MarkdownCollapse bootstrap-4-backport">
        <p>
          <SafeAnchor
            onClick={() => setShow(!show)}
            aria-controls="collapse-text"
            aria-expanded={show}
          >
            {/* fix icons */}
            {show ? '-' : '+'} {show ? 'Hide' : 'View'} {textDescription} {wordCount ? `(${wordCount} words)` : ''}
          </SafeAnchor>
        </p>
        {showCopyPlainText && <p>
          <SafeAnchor
            onClick={() => {
              const textContent = getMarkdownTextContent()
              if (textContent) {
                navigator.clipboard.writeText(textContent).then(() => {
                  displayToast('Successfully copied to the clipboard')
                })
              }
            }}
          >
            Copy {textDescription} to clipboard
          </SafeAnchor>
        </p>}
        <Collapse in={show}>
          <div id="collapse-text">
            <MarkdownSynapse {...props} ref={markdownRef}/>
          </div>
        </Collapse>
    </div>
  )
}

export default MarkdownCollapse
