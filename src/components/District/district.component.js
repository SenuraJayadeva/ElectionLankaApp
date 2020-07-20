import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import Paper from "@material-ui/core/Paper";

import "./searchByDistrictParty.css";

import Background from "./1.jpg";

const ListCandidate = (props) => (
  <div className="col-md-4" elevation={3} style={{ padding: "15px" }}>
    <Paper
      style={{
        boxShadow: "5px 5px 10px #888888",
        width: "90%",
        backgroundColor: "#129094",
        color: "white",
        padding: "2px",
      }}
    >
      <p>චන්ද අංකය {props.candidateElectionNumber}</p>
      <p>{props.candidateName}</p>
    </Paper>
  </div>
);

export default class FindCandidates extends Component {
  constructor(props) {
    super(props);

    this.onChangeDistrict = this.onChangeDistrict.bind(this);
    this.onChangeParty = this.onChangeParty.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      district_id: 0,
      districts: [],
      party_id: 0,
      parties: [
        {
          PARTY_ID: 0,
          PARTY_NAME: "පක්ෂය තෝරන්න ",
        },
      ],
      candidates: [],
    };
  }

  componentDidMount() {
    const config = {
      headers: {
        "api-key": "0d9e15c7-3189-4402-8e3f-e5073ff00281",
      },
    };

    //Get all Districts
    axios
      .get("https://janawarama.helakuru.lk/api/election/district", config)
      .then(({ data }) => {
        if (data.data.length > 0) {
          console.log(data.data.length); //length of the array
          console.log(data.data);
          this.setState({
            districts: data.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //Get all Parties
    axios
      .get("https://janawarama.helakuru.lk/api/election/parties", config)
      .then(({ data }) => {
        if (data.data.length > 0) {
          console.log(data.data.length); //length of the array
          console.log(data.data);
          // this.setState({
          //   parties: ["one", "two"],
          // });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeDistrict(e) {
    this.setState({
      district_id: e.target.value,
    });

    const config = {
      headers: {
        "api-key": "0d9e15c7-3189-4402-8e3f-e5073ff00281",
      },
      params: {
        district_id: e.target.value,
      },
    };

    //get parties of given district
    axios
      .get("https://janawarama.helakuru.lk/api/election/candidates", config)
      .then(({ data }) => {
        console.log(data);
        console.log(data.data.length);
        if (data.data.length > 0) {
          this.setState({
            parties: data.data, //assign data of parties into the party array
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeParty(e) {
    this.setState({
      party_id: e.target.value,
    });
  }

  async onSubmit(e) {
    e.preventDefault();

    const config = {
      headers: {
        "api-key": "0d9e15c7-3189-4402-8e3f-e5073ff00281",
      },

      params: {
        district_id: this.state.district_id,
        party_id: this.state.party_id,
      },
    };

    await axios
      .get("https://janawarama.helakuru.lk/api/election/candidates", config)
      .then(({ data }) => {
        console.log(data.data[0].PARTY_CANDIDATES.length);
        if (data.data[0].PARTY_CANDIDATES.length > 0) {
          this.setState({
            candidates: data.data[0].PARTY_CANDIDATES,
          });
          console.log(data.data[0].PARTY_CANDIDATES); //display all candidates of given district and given party
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  candidateList() {
    return this.state.candidates.map((currentcandidate) => {
      return (
        <ListCandidate
          candidateElectionNumber={currentcandidate.C_NUMBER}
          candidateName={currentcandidate.C_NAME}
          key={currentcandidate.C_ID}
        />
      );
    });
  }

  ////////////////////////////////////////////////////////////////////////////////

  render() {
    return (
      <>
        <div
          className="row"
          style={{
            backgroundImage: `url(${Background})`,
            height: "400px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
        <div>
          <div className="row" style={{ textAlign: "center" }}>
            <div className="col-md-12">
              <form className="forms" onSubmit={this.onSubmit}>
                <select
                  className="formElements"
                  value={this.state.district_id}
                  onChange={this.onChangeDistrict}
                >
                  <option>දිස්ත්‍රික්කය තෝරන්න</option>
                  {this.state.districts.map(function (district) {
                    return (
                      <option key={district.D_ID} value={district.D_ID}>
                        {district.D_NAME}
                      </option>
                    );
                  })}
                </select>

                <select
                  className="formElements"
                  value={this.state.party_id}
                  onChange={this.onChangeParty}
                >
                  <option>Select Political Party</option>
                  {this.state.parties.map(function (party) {
                    return (
                      <>
                        <option key={party.PARTY_ID} value={party.PARTY_ID}>
                          {party.PARTY_NAME}
                        </option>
                      </>
                    );
                  })}
                </select>
                <button
                  type="submit"
                  className="btn btn-md btn-info formElements"
                >
                  Search
                </button>
              </form>
            </div>

            <div className="row">{this.candidateList()}</div>
          </div>
        </div>
      </>
    );
  }
}
