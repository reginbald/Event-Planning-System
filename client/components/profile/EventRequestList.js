import React from 'react';
import {List, ListItem} from 'material-ui/List';

const EventRequestList = ({eventrequests}) => {
  console.log("eventrequest list has: ", eventrequests)
  return (
    <div>
      <h1>EventRequests</h1>
        <List>
        <ListItem primaryText="Inbox"  />
        <ListItem primaryText="Starred" />
        <ListItem primaryText="Sent mail" />
        <ListItem primaryText="Drafts" />
        <ListItem primaryText="Inbox" />
      </List>
    </div>
  );
};

export default EventRequestList;
