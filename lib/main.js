import React from 'react'

export default React.createClass({
  render() {
    return (
      <main className="appContainer">
        <header className="appHeader">
          
        </header>
        <ul className="log">
          <li className="log--item">

          </li>
        </ul>
        <form method="POST"
              action="#" />
          <input type="text"
                 placeholder="Message"
                 className="messageInput" />
          <input type="submit"
                 className="messageSubmit"
                 value="SEND" />
        </form>
      </main>
    )
  }
})
