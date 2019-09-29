import React from "react";
import { QRCode } from "react-qr-svg";
import './css/QRAndURL.css'

class QRAndURL extends React.Component {

  constructor(props) {
    super(props);
    this.textRef = React.createRef();
    console.log(this.props);
    
  }

  copy = (e) => {
    console.log(this.textRef);
    navigator.clipboard.writeText(this.textRef.current.defaultValue);
  }

  render() {

    return (
      <div className="qrAndUrl">
        <div className="qrBox">
        <QRCode
          bgColor="#FFFFFF"
          fgColor="#000000"
          level="Q"
          style={{ width: 256 }}
          value={`${window.location.href.split('?')[0]}?token=${this.props.token}`}
        />
           
           </div>
         <div className="ui action input">
            <input className= "urlBox" ref={this.textRef} type="text" readOnly value={`${window.location.href.split('?')[0]}?token=${this.props.token}`} />
            <button className="ui teal right labeled icon button" onClick={this.copy}>
              Copy
              </button>
          </div>
      </div>
    );
  }
}

export default QRAndURL;