import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';

const EventRequestList = ({eventrequests}) => {
  console.log("eventrequest list has: ", eventrequests)
  return (
    <div>
      <MuiThemeProvider>
        <h1>EventRequests</h1>
          <List>
          <ListItem primaryText="Inbox"  />
          <ListItem primaryText="Starred" />
          <ListItem primaryText="Sent mail" />
          <ListItem primaryText="Drafts" />
          <ListItem primaryText="Inbox" />
        </List>
      </MuiThemeProvider>
    </div>
  );
};

export default EventRequestList;
