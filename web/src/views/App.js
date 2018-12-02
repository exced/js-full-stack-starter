/**
 *
 * @flow
 */

import * as React from "react";
import { Query } from "react-apollo";
import { Button, Icon } from "antd";

import { profile } from "../queries/user";
import { clear } from "../services/storage";

type Props = {};

export default class App extends React.Component<Props> {
  render() {
    return (
      <Query query={profile}>
        {({ client, loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          const logout = () => {
            clear();
            this.props.history.push("/");
            client.resetStore();
          };

          return (
            <div>
              <h1>{`Hello ${data.profile.email}`}</h1>
              <Button onClick={logout}>
                <Icon type="logout" />
                Logout
              </Button>
            </div>
          );
        }}
      </Query>
    );
  }
}
