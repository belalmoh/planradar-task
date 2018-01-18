import React, { Component } from 'react'
import { FormGroup, FormControl, InputGroup, Glyphicon, Button } from 'react-bootstrap';
export default class Search extends Component {
    constructor(){
        super();

        /**
         * searchText => used to bind the form with it.
         */
        this.state = {
            searchText: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * This function is used to change the value of the binded variable searchText
     * with its form element, that is used for filtering the list.
     * 
     * @param {any} element 
     * @memberof Search
     */
    handleChange(element) {
        this.props.handleChange(element.target.value);
    }

    render() {
        return (
            <FormGroup>
                <InputGroup>
                    <InputGroup.Button>
                        <Button bsStyle="primary" onClick={() => this.props.onAddNewClicked()}>
                            <Glyphicon glyph="plus" />
                        </Button>
                    </InputGroup.Button>
                    <FormControl type="text" placeholder="Search for a Car" onChange={this.handleChange}/>
                    <InputGroup.Addon>
                        <Glyphicon glyph="search"/>
                    </InputGroup.Addon>
                </InputGroup>
            </FormGroup>
        )
    }
}