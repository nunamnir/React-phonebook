import React, { Component } from "react";
import Modal from '../components/Modal';

const initialData = [
    {id: 0, name: "Папа", number: "0501234567"},
    {id: 1, name: "Мама", number: "0971234567"},
    {id: 2, name: "Бабушка", number: "0951234567"}
];

export class PhoneBookApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            data: initialData
        };
        console.log('PhoneBookApp data', this.state.data);
        console.log('PhoneBookApp props', this.props);
    };

    handleContactSubmit = (contact) => {
        this.state.data.unshift(contact);
        this.setState({
            data: this.state.data
        });
    };

    componentDidMount = () => {
        console.log('componentDidMount');
        console.log('PBA mount data', this.state.data);
        // this.loadDataFromVar();
        // setInterval(this.loadDataFromVar, this.props.pollInterval);
    };

    componentDidUpdate = () => {
        console.log('componentDidUpdate');
        console.log('update data', this.state.data);
    };

    componentWillUnmount = () => {
        console.log('componentWillUnmount');
        console.log('new data', this.state.data);
    };

    modalFormData = (id) => {
        console.log('id', id);  
        // this.setState({ isOpen: true });
        let index;
        this.state.data.forEach(
            (item, i) => {
                if(item.id === id) {
                    index = i;
                    console.log('index', index);
                    this.setState({ isOpen: true, refer: index }, () => {
                        console.log('refer', this.state.refer);
                    });                 
                }
            }
        )
    };

    deleteData = (id) => {
        console.log('id', id);
        let index;
        this.state.data.forEach((item, i) => {
            if(item.id === id) {
                index = i;
            }
        })
        this.state.data.splice(index, 1);
        this.setState({
            data: this.state.data
        })
    };

    updateData = (refer, editContact) => {
        // console.log('updateData enter');
        this.state.data[refer] = editContact;
        this.setState({
            data: this.state.data
        });
    };

    render() {
        let trigger = this.state.isOpen;
        let element;
        if(trigger) {
            element = 
                <Modal 
                updateData={this.updateData} 
                refer={this.state.refer} 
                data={this.state.data} 
                isOpen={this.state.isOpen} 
                onClose={(e) => this.setState({ isOpen: false, refer: undefined })} 
                />
        } else {
            element = null;
        }
        
        return (
            <div id="phoneBookApp">
                <div className="phonebook-wrap">
                    <h2>Phonebook</h2>
                    <AddContactForm onContactSubmit={this.handleContactSubmit} />
                </div>           
                <PhoneBookList data={this.state.data} modalFormData={this.modalFormData} deleteData={this.deleteData} />
                {element}         
            </div>

        );
    }
};

class PhoneBookList extends Component {
    constructor(props) {
        super(props);
        // console.log('PBL', this.props);
        this.state = {
            isOpen: this.props.isOpen,
            data: this.props.data
        }
    };

    componentDidUpdate = () => {
        // console.log('componentDidUpdate');
        // console.log('update data', this.state.data);
        // this.render();
    };

    render() {
        console.log('PBL RENDER CALLED');
        let contactNodes = this.state.data.map(
            (contact) => {
                return (
                    <Contact 
                    modalFormData={this.props.modalFormData}
                    deleteData={this.props.deleteData}
                    key={contact.id}
                    id={contact.id}
                    name={contact.name}
                    number={contact.number} />
                )
            }
        );
        // console.log(contactNodes);
        return (
            <div className="phoneBookList">                
                {contactNodes}
            </div>
        );
    }
};

class AddContactForm extends Component {
    handleSubmit = (event) => {
        event.preventDefault();

        let name = this.trackName.value.trim();
        let number = this.trackNumber.value.trim();

        if( !name || !number ) return;

        let newContact = {
            id: parseInt(Date.now()), 
            name: name, 
            number: number
        }

        this.props.onContactSubmit(newContact);     
        this.trackName.value = '';
        this.trackNumber.value = '';
        return;
    }

    render() {
        return (
            <form className="addContactForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Guru Drona" minLength="4" maxLength="15" title="от 4 до 15 символов" ref={node => {this.trackName = node}} required/>
                <input type="text" placeholder="0891234567" pattern="[0-9]{10}" minLength="10" maxLength="10"  title="10 цифр от 0 до 9" ref={node => {this.trackNumber = node}} required/>
                <button type="submit">Add Contact</button>
            </form>
        );
    }
};

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {          
            id: this.props.id,
            name: this.props.name,
            number: this.props.number
        };
        console.log('Contact props', this.props);
    }

    componentDidMount = () => {
        console.log('componentDidMount');
    };

    componentWillUnmount = () => {
        console.log('componentWillUnmount');
    };

    componentDidMount = () => {
        console.log('componentDidMount');
        console.log('mount data', this.state);
    };

    render() {
        return (
            <div className="contact">
                <h2>{this.state.name}</h2>
                <p>{this.state.number}</p>
                <div>
                    <button className="green" type="submit" onClick={() => this.props.modalFormData(this.state.id)}>Edit</button>
                    <button className="red" type="submit" onClick={() => this.props.deleteData(this.state.id)}>Delete</button>
                </div>
            </div>
        );
    }
}