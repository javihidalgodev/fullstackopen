import PropTypes from 'prop-types'

const Notification = ({ content }) => {
  return (
    <div className={`notification ${content.type}`}>
      {content.message}
    </div>
  )
}

Notification.propTypes = {
  content: PropTypes.object.isRequired
}

export default Notification