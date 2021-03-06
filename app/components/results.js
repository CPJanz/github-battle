import React from "react";
import PropTypes from "prop-types";
import { battle } from "../utils/api";
import Card from "./Card";
import Loading from "./Loading";
import Tooltip from "./Tooltip";
import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUser,
  FaUserFriends,
  FaCode
} from "react-icons/fa";
import queryString from "query-string";
import { Link } from "react-router-dom";

function ProfileList({ profile }) {
  return (
    <ul className="card-list">
      <li>
        <FaUser color="rgb(239,115,115)" size={22} />
        {profile.name}
      </li>
      {profile.location && (
        <li>
          <Tooltip text="User's Location">
            <FaCompass color="rgb(144,115,255)" size={22} />
            {profile.location}
          </Tooltip>
        </li>
      )}
      {profile.company && (
        <li>
          <Tooltip text="User's Company">
            <FaBriefcase color="#795548" size={22} />
            {profile.company}
          </Tooltip>
        </li>
      )}
      <li>
        <FaUsers color="rgb(129,195,245)" size={22} />
        {profile.followers.toLocaleString()} Followers
      </li>
      <li>
        <FaUserFriends color="rgb(64,183,95)" size={22} />
        {profile.following.toLocaleString()} Following
      </li>
    </ul>
  );
}

export default class Results extends React.Component {
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true
  };

  componentDidMount() {
    const { playerOne, playerTwo } = queryString.parse(
      this.props.location.search
    );
    battle([playerOne, playerTwo])
      .then(results => {
        this.setState({
          winner: results[0],
          loser: results[1],
          error: null,
          loading: false
        });
      })
      .catch(({ message }) => {
        this.setState({ error: message, loading: false });
      });
  }

  render() {
    const { winner, loser, error, loading } = this.state;

    if (loading === true) {
      return <Loading text="Battling" />;
    }

    if (error) {
      return <p className="center-text error">{error}</p>;
    }

    return (
      <React.Fragment>
        <div className="grid space-around container-sm">
          <Card
            header={winner.score === loser.score ? "Tie" : "Winner"}
            subheader={`Score: ${winner.score.toLocaleString()}`}
            avatar={winner.profile.avatar_url}
            name={winner.profile.login}
            link={winner.profile.html_url}
          >
            <ProfileList profile={winner.profile} />
          </Card>
          <Card
            header={winner.score === loser.score ? "Tie" : "Loser"}
            subheader={`Score: ${loser.score.toLocaleString()}`}
            avatar={loser.profile.avatar_url}
            name={loser.profile.login}
            link={loser.profile.html_url}
          >
            <ProfileList profile={loser.profile} />
          </Card>
        </div>
        <Link className="btn dark-btn btn-space" to="/battle">
          Reset
        </Link>
      </React.Fragment>
    );
  }
}
