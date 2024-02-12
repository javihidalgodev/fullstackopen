import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Toggable = forwardRef((props, refs) => {
  const [visibility, setVisibility] = useState('')

  const hideWhenVisible = { display: visibility ? 'none' : '' }
  const showWhenVisible = { display: visibility ? '' : 'none' }

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => toggleVisibility()}>{props.label}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={() => toggleVisibility()}>cancel</button>
      </div>
    </div>
  )
})

Toggable.propTypes = {
  label: PropTypes.string.isRequired
}

Toggable.displayName = 'Toggeable'

export default Toggable