import React, { Component } from "react";
import axios from 'axios';

// Components
import Sidebar from "./Sidebar";
import AuthorList from "./AuthorList";
import AuthorDetail from "./AuthorDetail";
import Loading from "./Loading";


class App extends Component {
  state = {
    currentAuthor: null,
    authors: [],
    loading: true

  };

  getAuthors = async () => {
    try {
      const response = await axios.get("https://the-index-api.herokuapp.com/api/authors/");
      const authors = response.data;

      this.setState({ authors, loading: false });
    }


    catch (error) {
      console.error("Error");
      console.error(error);

    }
  }
  componentDidMount() {
    this.getAuthors();
  }





  selectAuthor = async author => {
    try {
      this.setState({ loading: true });
      const response = await axios.get(
        `https://the-index-api.herokuapp.com/api/authors/${author.id}/`);

      this.setState({ currentAuthor: response.data, loading: false })
    }
    catch (error) {
      console.error("Error");
      console.error(error);

    }
  }

  unselectAuthor = () => this.setState({ currentAuthor: null });

  getContentView = () => {

    if (this.state.currentAuthor) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else {
      return this.state.loading ? (
        <Loading />
      )
        :
        (< AuthorList authors={this.state.authors} selectAuthor={this.selectAuthor} />)
    }
  };

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>
          <div className="content col-10">{this.getContentView()}</div>
        </div>
      </div>
    );
  }
}

export default App;
