import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import ProjectLogo from './ProjectLogo';

class Footer extends Component {
  render() {
    return (
     	<div className="footer">
	       <Grid textAlign='center' columns={5} inverted>
		    <Grid.Row color='black'>
		      <Grid.Column>
		      	<ProjectLogo />
		      </Grid.Column>
			  <Grid.Column>
		      		<Link to={'about/'}>
		        		<Segment color='black' inverted>
		      				About
		      			</Segment>
		      		</Link>
		      </Grid.Column>
		      <Grid.Column>
		      		<Link to={'about/'}>
		        		<Segment color='black' inverted>
		      				Terms of Service
		      			</Segment>
		      		</Link>
		      </Grid.Column>
		      <Grid.Column>
		      		<Link to={'about/'}>
		        		<Segment color='black' inverted>
		      				Privacy Policy
		      			</Segment>
		      		</Link>
		      </Grid.Column>
		      <Grid.Column>
		      </Grid.Column>
		    </Grid.Row>
		    <Grid.Row color='black'>
		      <Grid.Column>
		      		<Link to={'about/'}>
		        		<Segment color='black' inverted>
		      				Site Map
		      			</Segment>
		      		</Link>
		      </Grid.Column>
		      <Grid.Column>
		      		<Link to={'about/'}>
		        		<Segment color='black' inverted>
		      				Contact Us
		      			</Segment>
		      		</Link>
		      </Grid.Column>
		      <Grid.Column>
		      		<Link to={'about/'}>
		        		<Segment color='black' inverted>
		      				FAQ
		      			</Segment>
		      		</Link>
		      </Grid.Column>
		    </Grid.Row>
		  </Grid>
     	</div>
    );
  }
}

export default Footer;
