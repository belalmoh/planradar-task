import React, { Component } from 'react'
import {Panel, ListGroup, ListGroupItem, InputGroup, Button, Glyphicon} from 'react-bootstrap'

export default class CarsList extends Component {
    
    
    render(){
        // console.log(this.props.cars);
        return (
            <div>
                {this.props.cars.filter((items)=>items.name.match(this.props.searchText)).map((item, key) => {
                    return (
                    <Panel key={key}>
                        <Panel.Heading>
                            <Panel.Title toggle>
                                {item.name}
                            </Panel.Title>
                                <InputGroup.Button>
                                    <Button bsStyle="danger" className="myButton pull-right" onClick={() => this.props.onRemoveClicked(item.id)}>
                                        <Glyphicon glyph="remove" />
                                    </Button>
                                    <Button bsStyle="warning" className="myButton pull-right" onClick={() => this.props.editCar(item.id)}>
                                        <Glyphicon glyph="pencil" />
                                    </Button>
                                </InputGroup.Button>
                        </Panel.Heading>
                        <Panel.Collapse>
                            <Panel.Body>
                                    <ListGroup>
                                        <ListGroupItem>Horsepower: {item.horsepower} HP</ListGroupItem>
                                        <ListGroupItem>Price: {item.price} $</ListGroupItem>
                                        <ListGroupItem>Type: {item.cartype}</ListGroupItem>
                                    </ListGroup>
                            </Panel.Body>
                        </Panel.Collapse>
                    </Panel>
                    )
                })}
            </div>
        )
    }
}