import React from 'react';
import ReactDom from 'react-dom';
import InputBox from './InputBox'
import QRAndURL from './QRAndURL'
import axios from 'axios'
import './css/index.css'

class App extends React.Component {

  state = { token: '', PreviousNote: '', tokenExists: true }
  onTextSubmit = (text) => {
    this.putDataToDB(text);
  }

  getUniqueId = () => {
    return 'private-' + Math.random().toString(36).substr(2, 9);
  }

  componentDidMount() {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token')
    if (token) {
      this.setState({ token, tokenExists: true })
      this.getDataFromDb(token)
    } else {
      this.setState({ token: this.getUniqueId(), tokenExists: false, noteExists: false })
    }

  }

  getDataFromDb = async (token) => {
    const resp = await axios.get(`http://localhost:3001/api/getData/?token=${token}`)
    let note = '';
    console.log(resp);
    if (resp.data.success) {
      note = resp.data.data.length > 0 ? resp.data.data[0].message : 'Old note was blank. Did you forget to submit?';
      console.log('data', note);
      this.setState({noteExists:resp.data.data[0]._id })
    } 
    if(!note){
      note = 'note was blank'
    }
    
    this.setState({ PreviousNote: note, noteExists:resp.data.data[0]._id });
    console.log(this.state);
    
  };

  putDataToDB = (message) => {

    if( !this.state.noteExists){
      axios.post('http://localhost:3001/api/putData', {
        id: this.state.token,
        message: message,
      });
    }else{
      axios.post('http://localhost:3001/api/updateData', {
        token: this.state.token,
        update: {message: message},
      });
    }
  };



  rednerNotes = (oldNotes) => {

    if (this.state.tokenExists) {
      console.log('sk', this.state.tokenExists);

    }

    if (!oldNotes && this.state.tokenExists) {
      console.log('called');
      return (
        <div className="load ui segment">
          <div className="ui active dimmer">
            <div className="ui text loader">Fetching your notes</div>
          </div>
          <p></p>
        </div>);
    } else {
      return <InputBox onTextSubmit={this.onTextSubmit} PreviousNote={this.state.PreviousNote} />
    }
  }

  render() {
    console.log('render')
    return (
      <div className="ui container">
        <h1 className="ui header">Online Notepad</h1>
        <div>{this.rednerNotes(this.state.PreviousNote)}</div>
        <QRAndURL token={this.state.token} />
      </div>
    );
  }

}

ReactDom.render(<App />, document.querySelector("#root"))