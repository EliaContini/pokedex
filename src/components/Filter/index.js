import React from "react";

import "./Filter.css";

class Filter extends React.Component {
    render() {
        return (
            <div className="Filter">
                <label htmlFor="search">Search</label>{" "}
                <input
                    className="Filter-input"
                    id="search"
                    onChange={this.props.handleSearch}
                    placeholder="Search by name or number"
                    type="search"
                />
            </div>
        );
    }
}

export default Filter;
