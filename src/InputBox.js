import React from 'react';

class InputBox extends React.Component {

  state = { text: this.props.PreviousNote};

  onInputChange = (event) => {
    this.setState({ text: event.target.value })
  }

  onSubmit = (event) => {
    event.preventDefault();
    console.log('submission', this.state.text);
    this.props.onTextSubmit(this.state.text);

  }

  render() {
    return (
      <div className="input-box ui segment">
        <form className="ui form" onSubmit={this.onSubmit}>
          <div className="field">
            <label> Enter note here</label>
            <textarea
              type="text"
              value={this.state.text}
              onChange={this.onInputChange}
            />
          </div>
          <button className="ui button" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default InputBox;