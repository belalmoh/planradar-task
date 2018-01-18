import React, {Component} from 'react'
import {Button, Modal, Form, FormGroup, ControlLabel, Col, FormControl} from 'react-bootstrap'

export default class CarsModal extends Component {
    constructor(props) {
        super(props);
        
        /**
         * {name, horsepower, price, cartype, id} => used to bind the form with it.
         */
        this.state = { 
            name: '',
            horsepower: '',
            price: '',
            cartype: '',
            id: ''
        };

        this.onAddNewCarButtonClicked = this.onAddNewCarButtonClicked.bind(this);
        this.onEditCarButtonClicked = this.onEditCarButtonClicked.bind(this);
    }

    /**
     * This function is used to handle the change of any of the inputs fields
     * that are binded to their variables. Just to keep the data binding valid.
     * 
     * @param {any} element 
     * @memberof CarsModal
     */
    handleChange(element) {
        this.setState({ [element.target.name]: element.target.value });
    }

    /**
     * This lifecycle method is used to activate the reusability of this modal.
     * To be used for both Adding and Editing.
     * 
     * So the setting part is used for passing the selected car to the form to be
     * populated with the data.
     * 
     * And the validation is used to prevent self-cycling.
     * 
     * @param {any} prevProps 
     * @param {any} prevState 
     * @memberof CarsModal
     */
    componentDidUpdate(prevProps, prevState){
        if (prevProps.selectedCar !== this.props.selectedCar){
            let {name, horsepower, price, cartype, id} = this.props.selectedCar[0];
            this.setState({name, horsepower, price, cartype, id});
        }
    }

    /**
     * This function is used to handle the adding of new car.
     * Then it resets the value of the binded variables with their form elements.
     * 
     * @memberof CarsModal
     */
    onAddNewCarButtonClicked() {
        this.setState({name: '', horsepower: '', price: '', cartype: ''})
        this.props.addNewCar(this.state)
    }
    
    /**
     * This function is used to handle the edit part by which it takes the current values
     * of the binded variables and pass them to its parent to edit the selected car.
     * 
     * @memberof CarsModal
     */
    onEditCarButtonClicked(){
        let {name, horsepower, id, cartype, price} = this.state;
        this.props.editCar({name, horsepower, id, cartype, price})
    }
    
    render() {
        return (
                <Modal
                    show={this.props.show}
                    container={this}
                    aria-labelledby="contained-modal-title">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                        {this.props.edit ? 'Edit':'Add New Car'}
						</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Name
			                </Col>
                            <Col sm={10}>
                                <FormControl type="text" placeholder="Name" name="name" onChange={this.handleChange.bind(this)} value={this.state.name}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Horsepower
			                </Col>
                            <Col sm={10}>
                                <FormControl type="text" placeholder="Horsepower" name="horsepower" onChange={this.handleChange.bind(this)} value={this.state.horsepower}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Price
			                </Col>
                            <Col sm={10}>
                                <FormControl type="text" placeholder="Price" name="price" onChange={this.handleChange.bind(this)} value={this.state.price}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Car Type
			                </Col>
                            <Col sm={10}>
                                <select className="selectpicker" onChange={this.handleChange.bind(this)} name="cartype" value={this.state.cartype}>
                                    {
                                        Object.keys(this.props.cartypes).map((key, i) => {
                                            return (
                                                <option key={i} value={this.props.cartypes[key]}>{this.props.cartypes[key]}</option>
                                            )   
                                        })
                                    }
                                </select>
                            </Col>
                        </FormGroup>
                    </Form>
					</Modal.Body>
                    <Modal.Footer>
                    {
                        this.props.edit ? 
                        <Button bsStyle="warning" type="button" onClick={() => this.onEditCarButtonClicked()}>Edit</Button>
                            : 
                        <Button bsStyle="success" type="button" onClick={() => this.onAddNewCarButtonClicked()}>Add New</Button>
                    }
                    
                    <Button onClick={this.props.onCloseModalClicked}>Close</Button>
                    </Modal.Footer>
                </Modal>
        );
    }
}