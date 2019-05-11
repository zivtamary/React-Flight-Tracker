import React, { Component } from "react";
import { connect } from "react-redux";
import { Bar } from "react-chartjs-2";

class Admin extends Component {

    state = {
        names: [],
        follows: []
    }

    componentDidMount() {
        let names = [];
        let follows = [];
        this.props.vacations.forEach(vacation => {
            names.push(vacation.destination);
            follows.push(vacation.follows);
        });

        this.setState({
            names,follows
        })
    }


  render() {
      
    const data = {
      labels: this.state.names,
      datasets: [
        {
          label: "Vacations order by popularity",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: this.state.follows
        },
      ],
      };
      
    return (
      <div className="container">
        <h2>Vacations ordered by Follows</h2>
        <Bar
          data={data}
          width={800}
          height={600}
          options={{
            maintainAspectRatio: true,
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  vacations: state.vacation.vacations,
});

export default connect(mapStateToProps)(Admin);
