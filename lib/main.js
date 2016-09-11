import React from 'react'

export default React.createClass({
  render() {
    return (
      <section className="appContainer">
        <header className="appHeader">
          <h1 className="title">
            Chat with people!
          </h1>
        </header>
        <ul className="log">
          <li className="log--item">
            sample message
          </li>
        </ul>
        <form method="POST"
              action="#"
              className="inputContainer">
          <input type="text"
                 placeholder="Message"
                 className="messageInput"/>
          <input type="submit"
                 className="messageSubmit"
                 value="SEND"/>
        </form>
      </section>
    )
  }
})
