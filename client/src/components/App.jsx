import React, {Component} from 'react'
import axios from 'axios'

import Search from './Search'
import CarsList from './CarsList'
import CarsModal from './CarsModal'
import '../Styles/App.css'

export default class App extends Component {
    constructor(props){
        super(props);

        /**
         * For a static choices to be used as values
         */        
        this.CAR_TYPES = {
            NONE: '',
            SPORTS_CAR: 'Sports Car',
            VAN: 'Van',
            OFFROAD: 'Offroad',
            SEDAN: 'Sedan',
            ELECTRIC: 'Electric Car'
        }

        /**
         * cars => the main array that will hold the objects of cars
         * 
         * isModalShown => used to show/hide the modal of adding/editing a car
         * 
         * selectedCarForEdit => used as an object to hold the selected car to be edit
         * 
         * searchText => is used as the text to be filtered by
         */    
        this.state = {
            cars: [],
            isModalShown: false,
            isForEdit: false,
            selectedCarForEdit: {},
            searchText: ''
        }

        this.onAddNewClicked = this.onAddNewClicked.bind(this);
        this.onCloseModalClicked = this.onCloseModalClicked.bind(this);
        this.addNewCar = this.addNewCar.bind(this);
        this.removeCar = this.removeCar.bind(this);
        this.showEditCarModal = this.showEditCarModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.editCar = this.editCar.bind(this);

        /**
         * Fetches the cars when the component first mounted
         */    
        axios({
            method: 'GET',
            url: 'http://localhost:3030/cars/getall'
        }).then(res => {
            let {cars} = res.data
            this.setState({cars})
        });
    }

    /**
     * This function is used to show the modal that is used for adding new car
     * 
     * @memberof App
     */
    onAddNewClicked(){
        this.setState({ isModalShown: true, isForEdit: false })
    }

    /**
     * This function is used to close the modal that is used for adding new car
     * 
     * @memberof App
     */
    onCloseModalClicked(){
        this.setState({ isModalShown: false })
    }

    /**
     * This function is used to show the modal that is used for editing a selected car
     * based on the passed id of it.
     * 
     * A filter is used to bring the car details based on the id.
     * 
     * @param {car id} id => used as a filter key
     */
    showEditCarModal(id){
        let {cars} = this.state
        cars = cars.filter((car) => car.id === id)
        this.setState({ isModalShown: true, isForEdit: true, selectedCarForEdit: cars })
    }

    
    /**
     * This function is used to edit the selected car on both client and server side
     * 
     * @param {Car} editedCar 
     * @memberof App
     */
    editCar(editedCar){
        let {cars} = this.state
        cars = cars.map((car,index) => {
            return car.id === editedCar.id ? editedCar : car
        })
        this.setState({cars, isModalShown: false});

        axios({
            method: 'PUT',
            url: 'http://localhost:3030/car/edit',
            data: {
                id: editedCar.id,
                name: editedCar.name,
                price: editedCar.price,
                horsepower: editedCar.horsepower,
                cartype: editedCar.cartype
            }
        })
    }

    /**
     * This function is used to add a new car on both server and client side.
     * 
     * @param {Object Resembles Car} {name, horsepower, price, cartype} 
     * @memberof App
     */
    addNewCar({name, horsepower, price, cartype}){
        let {cars} = this.state;
        cars.push({ name, horsepower, price, cartype});
        this.setState({cars, isModalShown: false});
        
        axios({
            method: 'POST',
            url: 'http://localhost:3030/cars/new',
            data: {
                name, horsepower, price, cartype
            }
        })
    }


    /**
     * This function is used to delete a car based on the id that is passed to it.
     * 
     * @param {integer} id => used to get the car from the client side
     * @memberof App
     */
    removeCar(id){
        let {cars} = this.state;
        cars = cars.filter((car) => id !== car.id)
        this.setState({cars})
        
        axios({
            method: 'DELETE',
            url: `http://localhost:3030/car/delete/${id}`
        });
    }

    /**
     * This function is used to change the value of the search text that is used to
     * filter the cars list.
     * 
     * @param {any} searchText 
     * @memberof App
     */
    handleChange(searchText){
        this.setState({ searchText });
    }

    render(){
        let { cars, searchText} = this.state;
        return (
            <div className="container">
                <Search onAddNewClicked={this.onAddNewClicked} handleChange={this.handleChange}/>
                <CarsList cars={cars} onRemoveClicked={this.removeCar} searchText={searchText} editCar={this.showEditCarModal}/>
                <CarsModal cartypes={this.CAR_TYPES} addNewCar={this.addNewCar} editCar={this.editCar} selectedCar={this.state.selectedCarForEdit} show={this.state.isModalShown} edit={this.state.isForEdit} onCloseModalClicked={this.onCloseModalClicked}/>
            </div>
        )
    }
}