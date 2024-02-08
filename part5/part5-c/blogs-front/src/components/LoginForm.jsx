import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  handleChangeUsername,
  handleChangePassword,
  username,
  password
}) => {
  return (
    <div id='loginForm'>
      <h1>logo in to application</h1>
      <form
        method='post'
        onSubmit={handleLogin}
      >
        <div>
          username
          <input
            type="text"
            name="Username"
            value={username}
            onChange={handleChangeUsername} />
        </div>
        <div>
          password
          <input
            type="password"
            name="Password"
            value={password}
            onChange={handleChangePassword} />
        </div>
        <div>
          <input
            type="submit"
            value="login" />
        </div>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleChangeUsername: PropTypes.func.isRequired,
  handleChangePassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm