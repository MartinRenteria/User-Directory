import React from "react";
import API from "../utils/API";

class Users extends React.Component {
  state = {
    users: [],
    search: "",
    sortDirection: "",
    col: ""
  };

  componentDidMount() {
    API.ListOfUsers()
      .then(res => {
        const userArray = res.data.results.map(user => {
          return {
            first: user.name.first,
            last: user.name.last,
            email: user.email,
            dob: user.dob.date,
            image: user.picture.medium
          };
        });
        this.setState({ users: userArray });
      })
      .catch(err => console.log(err));
  }

  //Updates search for each new character
  handleSearchChange = e => {
    this.setState({ search: e.target.value });
  };

  //Filtering search to match first and last name
  filteredUsers() {
    const search = this.state.search.toLowerCase();
    return this.state.users.filter(user => {
      return (
        user.first.toLowerCase().includes(search) ||
        user.last.toLowerCase().includes(search)
      );
    });
  }

  //Rendering users
  renderUsers = () => {
    return this.filteredUsers()
      .sort(this.sortUsers)
      .map((user, index) => {
        return (
          <tr key={index}>
            <td>
              <img src={user.image} alt="user"></img>
            </td>
            <td>{user.first}</td>
            <td>{user.last}</td>
            <td>{user.email}</td>
            <td>{new Date(user.dob).toDateString()}</td>
          </tr>
        );
      });
  };

   // Makes list names clickable
   Header = col => {
    return this.state.col === col
      ? `clickable ${this.state.sortDirection}`
      : `clickable`;
  };

// Resets list ordering 
  handleSort = col => {
    this.state.col === col && this.state.sortDirection === "ascending"
      ? this.setState({ sortDirection: "descending", col: col })
      : this.setState({ sortDirection: "ascending", col: col });
  };

  //Manages sort direction based on 1 value or -1
  sortUsers = (a, b) => {
    if (a[this.state.col] < b[this.state.col]) {
      return this.state.sortDirection === "ascending" ? -1 : 1;
    } else if (a[this.state.col] > b[this.state.col]) {
      return this.state.sortDirection === "ascending" ? 1 : -1;
    }
    return 0;
  };

  //render the user container including search field
  render() {
    return (
      <>
        <div className="input-group justify-content-center">
          <div className="input-group-prepend"></div>
          <input
            onChange={this.handleSearchChange}
            type="search"
            className="form-control m-3"
            placeholder="Search"
            aria-label="SearchBox"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="table m-3">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">
                  <span
                    className={this.Header("first")}
                    onClick={() => {
                      this.handleSort("first");
                    }}
                  >
                    First
                  </span>
                </th>
                <th scope="col">
                  <span
                    className={this.Header("last")}
                    onClick={() => this.handleSort("last")}
                  >
                    Last
                  </span>
                </th>
                <th scope="col">
                  <span
                    className={this.Header("email")}
                    onClick={() => this.handleSort("email")}
                  >
                    Email
                  </span>
                </th>
                <th scope="col">
                  <span
                    className={this.Header("dob")}
                    onClick={() => this.handleSort("dob")}
                  >
                    DOB
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>{this.renderUsers()}</tbody>
          </table>
        </div>
      </>
    );
  }
}

export default Users;