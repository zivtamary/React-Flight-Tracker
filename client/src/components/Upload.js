import React, { Component } from "react";
import { connect } from "react-redux";
import { postVacation, clearErrors } from "../store/actions/vacationActions";

class Upload extends Component {
  state = {
    selectedFile: null,
    info: "",
    destination: "",
    startDate: "",
    endDate: "",
    price: "",
  };

  handleChange = e => {
    let file;
    if (e.target.files[0]) {
      file = `http://localhost:3000/${e.target.files[0].name}`
    } else {
      file = '';
    }
    this.setState({
      selectedFile: e.target.files[0],
      image: file,
      loaded: 0,
    });
  };

  handleVacation = e => {
    if (this.props.msg) {
      this.props.clearErrors();
    }
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleClick = e => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    const { info, destination, price, image, startDate, endDate } = this.state;
    let vacation = {
      info,
      destination,
      price,
      image,
      startDate,
      endDate,
    };
    
    this.props.postVacation(vacation, data, ()=>{this.props.socket.updateVacation()});

    this.setState({
      selectedFile: null,
      info: "",
      destination: "",
      startDate: "",
      endDate: "",
      price: "",
    });
  };

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    return (
      <div className="container">
        {this.props.msg ? (
          <div className="alert alert-secondary lead" role="alert">
            {this.props.msg}
          </div>
        ) : null}
        <div className="row">
          <div className="col-md-12">
            <form method="post" onSubmit={this.handleClick}>
              <div className="form-group">
                <input
                  id="destination"
                  className="form-control"
                  onChange={this.handleVacation}
                  value={this.state.destination}
                  placeholder="destination"
                />
              </div>
              <div className="form-group">
                <input
                  id="info"
                  className="form-control"
                  onChange={this.handleVacation}
                  value={this.state.info}
                  placeholder="info"
                />
              </div>
              <div className="form-group">
                <input
                  id="price"
                  type="number"
                  min="0"
                  max="20000"
                  className="form-control"
                  onChange={this.handleVacation}
                  value={this.state.price}
                  placeholder="price"
                />
              </div>
              <div className="form-group">
                <div className="floating-label">
                  <label htmlFor="startDate">Start date</label>
                  <input
                    id="startDate"
                    type="date"
                    className="form-control"
                    onChange={this.handleVacation}
                    value={this.state.startDate}
                    aria-describedby="startDate"
                    placeholder="Start date"
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="floating-label">
                  <label htmlFor="startDate">End date</label>
                  <input
                    id="endDate"
                    type="date"
                    className="form-control"
                    onChange={this.handleVacation}
                    value={this.state.endDate}
                    aria-describedby="endDate"
                    placeholder="End date"
                  />
                </div>
              </div>

              <div className="form-group files color">
                <label>Upload Your File </label>
                <input
                  type="file"
                  className="form-control"
                  multiple=""
                  name="file"
                  onChange={this.handleChange}
                />
              </div>
              <button className="btn btn-primary btn-block">SEND</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { postVacation, clearErrors }
)(Upload);
