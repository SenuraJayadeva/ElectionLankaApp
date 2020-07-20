import React, { useState, useEffect } from "react";
import axios from "axios";

const ListParties = (props) => (
  <tr>
    <td>{props.partyID}</td>
    <td>{props.partyName}</td>

    <td>
      <img src={props.partyLogo} alt="logo" width="40px" />
    </td>
  </tr>
);

export default function PoliticalParties() {
  const [parties, setParties] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        "api-key": "0d9e15c7-3189-4402-8e3f-e5073ff00281",
      },
    };

    axios
      .get("https://janawarama.helakuru.lk/api/election/parties", config)
      .then(({ data }) => {
        console.log(data);
        console.log(data.data.length);

        if (data.data.length > 0) {
          setParties(data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function partiesList() {
    return parties.map((currentparty) => {
      return (
        <ListParties
          partyID={currentparty.PARTY_ID}
          partyName={currentparty.PARTY_NAME}
          partyLogo={currentparty.PARTY_LOGO}
          key={currentparty.PARTY_ID}
        />
      );
    });
  }
  return (
    <div>
      <table>{partiesList()}</table>
    </div>
  );
}
