import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, Icon, Image, Label, Card } from 'semantic-ui-react';

import Logo from '../images/macbook.jpg';
import Bronze from '../images/bronze.png';
import Silver from '../images/silver.png';
import Gold from '../images/gold.png';

import UserProfileContainer from '../containers/UserProfileContainer';

import '../stylesheets/user-profile-info.scss';


class UserProfileInfo extends Component {
  render() {
    let url;

    if (this.props.userProfile.image) {
      url = this.props.userProfile.image;
    }
    else {
      url = "https://react.semantic-ui.com/images/wireframe/image.png";
    }

    return (
      <Card className="user-profile-container-card" centered>
        <Image size='medium' src={ url } />
        <Card.Content className="user-profile-content">
          <Card.Header>
            { this.props.userProfile.first_name + " " + this.props.userProfile.last_name }
          </Card.Header>
          <Card.Meta>
            <span className='owner-name'>Email: { this.props.userProfile.email }</span>
          </Card.Meta>
          <Card.Meta>
            <span className='owner-name'>Birthday: { this.props.userProfile.date_of_birth }</span>
          </Card.Meta>
          <Card.Meta>
            <span className='owner-name'>Location: { this.props.userProfile.location }</span>
          </Card.Meta>
          <Card.Meta>
            { this.props.userProfile.points >=10 && this.props.userProfile.points < 50 ?
            <Image src={ Bronze } /> : null }
          </Card.Meta>
          <Card.Meta>
            { this.props.userProfile.points >= 50 && this.props.userProfile.points < 100 ?
            <Image src={ Silver } /> : null }
          </Card.Meta>
          <Card.Meta>
            { this.props.userProfile.points >= 100 ?
            <Image src={ Gold } /> : null }
          </Card.Meta>
        </Card.Content>
        { this.props.viewingMyProfile ?
          <Card.Content extra className="edit-profile-button-container">
            <Link to={`/user_profiles_change/${this.props.userProfile.id}/edit`}>
              <Button className="edit-profile-button">Edit</Button>
            </Link>
        </Card.Content> : null }
      </Card>
    );
  }
}

export default UserProfileInfo;
