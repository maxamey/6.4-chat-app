import React from 'react'

export default React.createClass({
  getInitialState(){
    return {
      chatLogItems: [
        {
          authorName: "",
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
      this.updateScroll();
    });
    xhr.open("GET", "http://tiny-tiny.herokuapp.com/collections/maxamey-chat-appzzz");
    xhr.send();
  },

  updateScroll(){
    var logElement = this.refs.log;
    logElement.scrollTop = logElement.scrollHeight;
  },

  onSubmitChatHandler(e){
    e.preventDefault();
    var messageInputTime = new Date();
    var humanInputTime = messageInputTime.toLocaleTimeString('en-US');
    var messageInputText = this.refs.messageInput.value;
    var newChatlogItemStringified = JSON.stringify({
      authorName: "Guest",
      timestamp: humanInputTime,
      message: messageInputText
    });

    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", (e)=>{
      var responseJSON = JSON.parse(e.target.response);
      this.getChatLogItems();
      this.refs.messageInput.value = "";
    });


    xhr.open("POST", "http://tiny-tiny.herokuapp.com/collections/maxamey-chat-appzzz");
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
        <ul className="log"
            ref="log">
          { this.state.chatLogItems.map((item, i)=>{
            return <li className="log__item"
                       key={i}
                       tabIndex="1">
              <h3 className="log__item--authorName">
                {item.authorName}
              </h3>
              <label className="log__item--timestamp">
                {item.timestamp}
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
