import React from 'react';
import './chat.css'
import MessageList from './MessageList';

class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input: "",
            connect: null,
            messages: [],
        };

        this.messageListRef = (el) => {
            this.messageList = el;
        }

        this.messageInputRef = (el) => {
            this.messageInput = el;
        }

        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.handleMessageInputChange = this.handleMessageInputChange.bind(this);
    }

    componentDidMount() {
        if (!window["WebSocket"]) {
            alert("Your browser does not support websocket");
            return;
        }
        var server = new WebSocket("ws://127.0.0.1:8080/ws");
        server.onmessage = (ev) => {this.onMessage(ev)};
        server.onclose = () => {this.onClose()};
        this.setState({
            connect: server,
        });
        this.messageInput.focus();
    }

    componentWillUnmount() {
        this.state.connect.close();
    }

    onMessage(ev) {
        var data = ev.data;
        var packet = JSON.parse(data);
        // TODO 根据消息包数据做具体操作，目前全部消息作为聊天内容
        var message = packet.data[0].msg; // 目前一个包一条消息，也不考虑cmd
        this.setState(preState => ({
            // messages: [...preState.messages, message],
            messages: preState.messages.concat(message),
        }));
        this.messageList.scrollTop = this.messageList.firstChild.clientHeight;
    }

    onClose(ev) {
        console.log("Connection closed");
    }

    handleMessageInputChange(e) {
        this.setState({
            input: e.target.value,
        });
    }

    handleSendMessage(e) {
        e.preventDefault();
        if (!this.state.connect) {
            return false;
        }
        if (!this.state.input) {
            return false;
        }
        var message = {
            'type': 1,
            'content': this.state.input,
        };
        // TODO 完善消息包数据
        var packet = {
            "packageId":"",
            "clientId":"",
            "packageType":"",
            "token":"",
            "data":[
                // {"cmd":"Ping"},
                // 目前一个包一条消息
                {
                    "cmd":"GlobalMessage",
                    "msg": message
                }
            ]
        };
        this.state.connect.send(JSON.stringify(packet));
        this.setState({
            input: "",
        });
        this.messageInput.focus();
    }

    render() {
        return (
            <div>
                Chat
                <div id="message-list" ref={this.messageListRef}>
                    <MessageList
                        messages={this.state.messages}
                    />
                </div>
                <form id="form" onSubmit={this.handleSendMessage}>
                    <input id="message" type="text" ref={this.messageInputRef} value={this.state.input} onChange={this.handleMessageInputChange} />
                    <input id="btn-send" type="submit" value="Send" />
                </form>
            </div>
        );
    }
}

export default Chat;
