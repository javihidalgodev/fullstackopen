const Notification = ({ content }) => {
  return (
    <div className={`notification ${content.type}`}>
      {content.message}
    </div>
  )
}
export default Notification