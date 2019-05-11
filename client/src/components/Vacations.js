import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getVacations,
  deleteVacation,
  updateVacation,
  followVacation,
  unfollowVacation,
} from "../store/actions/vacationActions";
import Upload from "./Upload";
import socket from '../socket'


class Vacations extends Component {
  state = {
    client: null,
    destination: "",
    price: "",
    info: "",
    id: null,
    startDate: "",
    endDate: "",
    vacations: this.props.vacations
  };

  componentDidMount() {
    this.setState({
      client: socket()
    }, () => {
      this.state.client.socket.on('updateVacations', () => {
        console.log('updating due to admin request')
        this.props.getVacations();
      })
    })
    this.props.getVacations();
  }


  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleFollowState = vacationId => {
    let vacation = this.props.vacations.find(v => v._id === vacationId);
    if (vacation) {
      if (vacation.followers.includes(this.props.user.id)) {
        return true;
      } else {
        return false;
      }
    }
  };

  handleFollow = vacationId => {
    this.handleFollowState(vacationId)
      ? this.props.unfollowVacation(vacationId, this.props.user.id)
      : this.props.followVacation(vacationId, this.props.user.id);
  };

  handleEdit = v => {
    this.setState({
      id: v._id,
      destination: v.destination,
      price: v.price,
      info: v.info,
      startDate: v.startDate,
      endDate: v.endDate,
    });
  };

  handleVacationEdit = e => {
    e.preventDefault();
    const { id, destination, price, info, startDate, endDate } = this.state;
    let newVacation = {
      id,
      destination,
      price,
      info,
      startDate,
      endDate,
    };
    this.props.updateVacation(newVacation, ()=>{this.state.client.updateVacation()});
  };

  handleVacationDelete = () => {
    this.props.deleteVacation(this.state.id, ()=>{this.state.client.updateVacation()});
  };

  render() {
    console.log(this.props.user['id'])
    const addVacation = this.props.user.role ? (
      <button
        className="btn btn-float btn-info mb-3"
        data-toggle="modal"
        data-target="#addVacationModal"
      >
        <i className="material-icons">add</i>
      </button>
    ) : null;


    const sortedList = this.props.vacations && this.props.vacations.sort((a, b) => b.followers.includes(this.props.user['id']) - a.followers.includes(this.props.user['id']))
    const vacationList = this.props.vacations ? (
      sortedList && sortedList.map(v => (
        <div className="col-sm-6 col-md-4 card-deck" key={v._id}>
          <div className="card">
            <img className="card-img-top" src={v.image} alt="destination img" />
            <div className="card-body">
              <p className="display-4">{v.destination.toUpperCase()}</p>
              <p className="card-text typography-subheading">{v.info}</p>
              <p className="card-text typography-title">
                Flight <i className="material-icons">flight_takeoff</i>
                {v.startDate}
              </p>
              <p className="card-text typography-title">
                Return <i className="material-icons">flight_land</i> {v.endDate}
              </p>
              <div className="card-text typography-subheading m-2">
                <p className="lead">Price: {v.price}$</p>
              </div>

              {this.props.user.role ? null : (
                <button
                  onClick={() => {
                    this.handleFollow(v._id);
                  }}
                  type="button"
                  className="btn btn-info"
                  disabled={this.props.loading}
                >
                  {this.handleFollowState(v._id) ? "unfollow" : "follow"}{" "}
                  <i className="material-icons">star</i>{" "}
                  <span className="badge badge-light">{v.follows}</span>
                </button>
              )}

              <div
                className="modal fade"
                id="editVacationModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="editVacationModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="editVacationModalLabel">
                        Edit vacation
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="form-group">
                          <label
                            htmlFor="destination"
                            className="col-form-label"
                          >
                            Destination:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="destination"
                            onChange={this.handleChange}
                            value={this.state.destination}
                          />
                        </div>
                        <div className="form-group textfield-box">
                          <label htmlFor="info" className="col-form-label">
                            Info:
                          </label>
                          <textarea
                            className="form-control"
                            id="info"
                            onChange={this.handleChange}
                            value={this.state.info}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="price" className="col-form-label">
                            Price
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="price"
                            onChange={this.handleChange}
                            value={this.state.price}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="price" className="col-form-label">
                            Start Date
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id="startDate"
                            onChange={this.handleChange}
                            value={this.state.startDate}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="price" className="col-form-label">
                            End Date
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id="endDate"
                            onChange={this.handleChange}
                            value={this.state.endDate}
                          />
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        onClick={this.handleVacationEdit}
                        data-dismiss="modal"
                        type="button"
                        className="btn btn-success"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {this.props.user.role ? (
              <div className="mb-3">
                <button
                  type="button"
                  className="btn btn-sm btn-float btn-warning mx-1"
                  data-toggle="modal"
                  data-target="#deleteModal"
                  onClick={() => {
                    this.setState({ id: v._id, destination: v.destination });
                  }}
                >
                  <i className="material-icons">delete</i>
                </button>
                <button
                  onClick={() => {
                    this.handleEdit(v);
                  }}
                  type="button"
                  className="btn btn-sm btn-float btn-warning mx-1"
                  data-toggle="modal"
                  data-target="#editVacationModal"
                >
                  <i className="material-icons">edit</i>
                </button>

                <div
                  className="modal fade"
                  id="deleteModal"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="deleteModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h4 className="mx-auto">
                          Delete this vacation to{" "}
                          <span className="badge badge-pill bg-danger text-light">
                            {this.state.destination}
                          </span>{" "}
                          ?
                        </h4>

                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="container">
                          <div className="row">
                            <div className="col-sm-6 mx-auto">
                              <p className="small">
                                You cannot recover the vacation after it's been
                                deleted!
                              </p>
                              <button
                                type="button"
                                data-dismiss="modal"
                                aria-label="Close"
                                className="btn btn-danger"
                                onClick={this.handleVacationDelete}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer" />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ))
    ) : (
      <div className="progress">
        <div
          className="progress-bar progress-bar-indeterminate"
          role="progressbar"
        />
      </div>
    );
    return (
      <div>
        {addVacation}

        <div className="row">
          <div
            className="modal fade"
            id="addVacationModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="addVacationModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addVacationModalLabel">
                    Add new vacation
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <Upload msg={this.props.msg} socket={this.state.client} />
                </div>
              </div>
            </div>
          </div>

          {vacationList}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  vacations: state.vacation.vacations,
  msg: state.vacation.msg,
  loading: state.vacation.loading,
});

export default connect(
  mapStateToProps,
  {
    getVacations,
    deleteVacation,
    updateVacation,
    followVacation,
    unfollowVacation,
  }
)(Vacations);
