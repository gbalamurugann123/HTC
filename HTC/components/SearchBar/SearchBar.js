import React, { Component } from "react";
import {
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  View,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import { searchResults } from "../../actions";

const searchIcon = require("../../assets/img/search.png");
const styles = require("./SearchBarStyles");
const stylesResult = require("./SearchResultsStyles");
const apiURL = "http://www.omdbapi.com/?type=movie&apikey=5d81e1ce";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      page: 1,
    };
  }

  searchAPI = (page) => {
    console.log("Page Number : " + page);

    let URL = apiURL + "&page=" + page + "&s=" + this.state.searchTerm;
    fetch(URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.json().then((data) => {
          if (data.Search && data.Search.length > 0) {
            if (page == 1) {
              this.props.searchResults(data.Search);
            } else {
              if (data.Search.length > 0) {
                var result = [];
                result = result.concat(this.props.results);
                result = result.concat(data.Search);
                this.props.searchResults(result);
              }
            }
          } else if (page == 1) {
            this.props.searchResults([]);
          }
        });
      })
      .catch((error) => console.log(error));
  };

  loadFirstData = () => {
    this.setState({
      searchTerm: this.state.searchTerm,
      page: 1,
    });

    this.searchAPI(1);
  };

  loadMoreData = () => {
    this.setState({
      searchTerm: this.state.searchTerm,
      page: this.state.page + 1,
    });

    this.searchAPI(this.state.page + 1);
  };

  render() {
    return (
      <View>
        <View style={styles.searchBarContainer}>
          <TextInput
            placeholder="Enter your search terms"
            style={styles.textInputSearch}
            underlineColorAndroid={"transparent"}
            onChangeText={(searchTerm) =>
              this.setState({ searchTerm: searchTerm, page: 1 })
            }
            value={this.state.searchTerm}
          />
          <TouchableOpacity
            style={styles.textSearchButton}
            onPress={() => this.loadFirstData()}
          >
            <Image source={searchIcon} style={styles.searchIcon} />
          </TouchableOpacity>
        </View>

        {this.props.results.length > 0 ? (
          <View style={stylesResult.searchResultsContainer}>
            <FlatList
              style={{ width: "100%" }}
              keyExtractor={(item, index) => index}
              data={this.props.results}
              renderItem={({ item, index }) => (
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Image
                    source={{ uri: item.Poster }}
                    style={stylesResult.imageView}
                  />

                  <Text style={stylesResult.textView}>{item.Title}</Text>
                </View>
              )}
              onEndReached={this.loadMoreData}
              onEndReachedThreshold={0.1}
              ItemSeparatorComponent={() => (
                <View style={stylesResult.separator} />
              )}
            />
          </View>
        ) : (
          <View style={stylesResult.searchResultsContainer}>
            <Text style={stylesResult.textView}>No Data</Text>
          </View>
        )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    results: state.results,
  };
}

export default connect(mapStateToProps, { searchResults })(SearchBar);