import React from 'react'

export default React.createClass({
  getInitialState(){
    return {
      chatLogItems: [
        {
          authorName: "guest",
          timestamp: "",
          message: ""
        }
      ]
    }
  },

  componentDidMount(){
    setInterval(()=>{
      this.getChatLogItems()
    }, 2000)
  },

  getChatLogItems(){
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", (e)=>{
      var responseJSON = JSON.parse(e.target.response);
      this.setState({
        chatLogItems: responseJSON
      });
    });
    xhr.open("GET", "http://tiny-tiny.herokuapp.com/collections/maxamey-chat-app");
    xhr.send();
  },

  onSubmitChatHandler(e){
    e.preventDefault();
    var messageInputText = this.refs.messageInput.value;
    console.log(this.refs.messageInput.value);
    var newChatlogItemStringified = JSON.stringify({
      authorName: "Guest",
      timestamp: "curentTime",
      message: messageInputText
    });

    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", (e)=>{
      var responseJSON = JSON.parse(e.target.response);
      this.getChatLogItems();
    });

    xhr.open("POST", "http://tiny-tiny.herokuapp.com/collections/maxamey-chat-app");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(newChatlogItemStringified);
  },

  render() {
    return (
      <section className="appContainer">
        <header className="appHeader">
          <h1 className="title">
            Chat with people!
          </h1>
        </header>
        <ul className="log">
          { this.state.chatLogItems.map((item, i)=>{
            console.log(item.authorName);
            return <li className="log__item"
                       key={i}>
              <h3 className="log__item--authorName">
                {item.authorName}
              </h3>
              <label className="log__item--timestamp">
                current time
              </label>
              <p className="log__item--message">
                {item.message}
              </p>
            </li>
          }).reverse()}
        </ul>
        <form method="POST"
              action="#"
              className="inputContainer"
              onSubmit={this.onSubmitChatHandler}>
          <input type="text"
                 placeholder="Message"
                 className="messageInput"
                 ref="messageInput"/>
          <input type="submit"
                 className="messageSubmit"
                 value="SEND"/>
        </form>
      </section>
    )
  }
})
