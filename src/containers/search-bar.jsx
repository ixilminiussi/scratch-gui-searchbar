import React from 'react';
import SearchBarComponent from '../components/search-bar/search-bar.jsx'

export default class SearchBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SearchBarComponent
                query={this.props.searchQuery}
                onInput={e => this.props.onSearch(e.target.value)}
                tags={this.props.searchTags}
                onTags={value => this.props.onTags(value)}
            />
        );
    }
};