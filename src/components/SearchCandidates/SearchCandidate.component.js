import React, { Component } from "react";
import axios from "axios";

import Paper from "@material-ui/core/Paper";

import "./SearchCandidate.css";

import {
  FormControl,
  MenuItem,
  Select,
  Button,
  Card,
  CardContent,
} from "@material-ui/core";

const ListCandidate = (props) => (
  <div className="col-md-4" elevation={3} style={{ padding: "15px" }}>
    <Paper
      style={{
        width: "90%",
        padding: "2px",
        background: "linear-gradient(45deg, #ededed 30%, #fcfcfc 90%)",
        borderRadius: "20px",
        boxShadow: "10px 5px 10px rgba(110, 107, 107, 0.548)",
        margin: "5px",
      }}
    >
      <br />
      <p>චන්ද අංකය {props.candidateElectionNumber}</p>
      <p>{props.candidateName}</p>
      <br />
    </Paper>
    <br />
  </div>
);

export default class SearchCandidates extends Component {
  constructor(props) {
    super(props);

    this.onChangeDistrict = this.onChangeDistrict.bind(this);
    this.onChangeParty = this.onChangeParty.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      district_id: "දිස්ත්‍රික්කය තෝරන්න",
      districts: [
        {
          D_ID: 0,
          D_NAME: "දිස්ත්‍රික්කය තෝරන්න",
        },
      ],
      party_id: 0,
      parties: [
        {
          // PARTY_ID: 0,
          // PARTY_NAME: "පක්ෂය තෝරන්න ",
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
        <div className="container">
          <div className="row" style={{ textAlign: "center" }}>
            <div className="col-md-12">
              <Card
                className="card-border1"
                style={{
                  // border: "1px solid #ccc",
                  background:
                    "linear-gradient(45deg, #ededed 30%, #fcfcfc 90%)",
                  borderRadius: "20px",
                  boxShadow: "10px 5px 10px rgba(110, 107, 107, 0.548)",
                  margin: "20px",
                }}
              >
                <CardContent>
                  <h3>2020 Sri Lankan parliamentary election</h3>
                </CardContent>
              </Card>
            </div>
            <div className="col-md-12">
              <Card
                className="card-border1"
                style={{
                  // border: "1px solid #ccc",
                  background:
                    "linear-gradient(45deg, #ededed 30%, #fcfcfc 90%)",
                  borderRadius: "20px",
                  boxShadow: "10px 5px 10px rgba(110, 107, 107, 0.548)",
                  margin: "20px",
                }}
              >
                <CardContent>
                  <FormControl>
                    <label>දිස්ත්‍රික්කය තෝරන්න</label>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      className="formInputs"
                      value={this.state.district_id}
                      onChange={this.onChangeDistrict}
                      placeholder="දිස්ත්‍රික්කය තෝරන්න"
                    >
                      <MenuItem value="">දිස්ත්‍රික්කය තෝරන්න</MenuItem>
                      {this.state.districts.map(function (district) {
                        return (
                          <MenuItem key={district.D_ID} value={district.D_ID}>
                            {district.D_NAME}
                          </MenuItem>
                        );
                      })}
                    </Select>

                    <br />

                    <label>පක්ෂය තෝරන්න</label>

                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      className="formInputs"
                      value={this.state.party_id}
                      onChange={this.onChangeParty}
                    >
                      {this.state.parties.map(function (party) {
                        return (
                          <MenuItem key={party.PARTY_ID} value={party.PARTY_ID}>
                            {party.PARTY_NAME}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <Button
                      className="formInputs"
                      onClick={this.onSubmit}
                      variant="outlined"
                      color="primary"
                    >
                      search
                    </Button>
                  </FormControl>
                </CardContent>
              </Card>
            </div>

            <div className="row">{this.candidateList()} </div>
          </div>
        </div>
      </>
    );
  }
}
