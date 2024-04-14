import { HTML } from '@brtmvdl/frontend'
import { HeaderComponent as ConnectComponent } from '../../components/header.component.js'
import { ContentComponent } from '../../components/content.component.js'
import { FooterComponent as SendComponent } from '../../components/footer.component.js'

export class Page extends HTML {
  children = {
    connect: new ConnectComponent(),
    send: new SendComponent(),
    content: new ContentComponent(),
  }

  state = {
    socket: this.createSocket(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getSendComponent())
    this.append(this.getContentComponent())
  }

  createSocket() {
    const socket = new io()
    socket.on('connection', (data) => console.log('connection', data))
    socket.on('message', (data) => this.onConnectMessage(data))
    socket.on('error', (data) => this.onConnectError(data))
    return socket
  }

  onConnectMessage({ data } = {}) {
    this.addMessage(data.toString())
  }

  onConnectError({ data } = {}) {
    this.addMessage(data.toString())
  }

  getContentComponent() {
    return this.children.content
  }

  getSendComponent() {
    this.children.send.on('send', (ev) => this.onSend(ev))
    return this.children.send
  }

  onSend({ value: data } = {}) {
    this.addMessage(data.toString())
    this.state.socket.send(data)
  }

  addMessage(message) {
    this.children.content.addMessage('message', message.toString())
  }

}
