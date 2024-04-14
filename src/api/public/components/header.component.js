import { HTML, nFlex, nInput, nButton } from '@brtmvdl/frontend'

export class HeaderComponent extends HTML {
  children = {
    url: new nInput(),
    connect: new nButton(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getFlex())
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getUrlInput().setContainerStyle('width', '80%'))
    flex.append(this.getConnectButton().setContainerStyle('width', '20%'))
    return flex
  }

  setInputStyle(component = new HTML()) {
    component.setContainerStyle('padding', '1rem')
    component.setStyle('padding', 'calc(1rem / 2)')
    component.setStyle('width', '100%')
    return component
  }

  getUrlInput() {
    this.setInputStyle(this.children.url)
    this.children.url.setPlaceholder('url')
    this.children.url.setValue(window.location.href)
    return this.children.url
  }

  getConnectButton() {
    this.setInputStyle(this.children.connect)
    this.children.connect.setText('connect')
    this.children.connect.on('click', () => this.onConnectButtonClick())
    return this.children.connect
  }

  onConnectButtonClick() {
    this.dispatchEvent('connect', this.children.url.getValue())
  }
}
