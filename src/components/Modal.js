import React, { Component } from 'react';

// https://www.youtube.com/watch?v=liF7puGjYA8

class Modal extends Component {
    constructor(props) {
        super(props);
        console.log('Modal', props);
        this.state = {
            refer: this.props.refer,
            isOpen: this.props.isOpen,
            data: this.props.data
        };
        this.Reference = this.state.refer;
        console.log('refer', this.Reference);
        console.log('isOpen', this.state.isOpen);
    }

    handleSumbitChanges = (event) => {
        event.preventDefault();
        this.props.onClose();
        let refer = this.state.refer;
        let name = this.trackName.value; 
        let number = this.trackNumber.value;

        if( !name || !number ) return;

        let editContact = {
            id: parseInt(Date.now()),
            name: name,
            number: number
        }

        this.props.updateData(refer, editContact);
        this.trackName.value = '';
        this.trackNumber.value = '';
        return;      
    }

    render() {
        let index = this.state.refer;
        let modalForm = (    
            <div id="modal-wrap">    
                <div id="modal-form">
                    <h4>Edit Contact</h4>
                    <div>
                        <h2>{this.state.data[index].name}</h2>
                        <p>{this.state.data[index].number}</p>
                    </div>
                    <form className="editContactForm">
                        <input type="text" placeholder={this.state.data[index].name} minLength="4" maxLength="15" title="от 4 до 15 символов" ref={node => {this.trackName = node}} />
                        <input type="tel" placeholder={this.state.data[index].number} pattern="[0-9]{10}" minLength="10" maxLength="10"  title="10 цифр от 0 до 9" ref={node => {this.trackNumber = node}} />
                        <div>
                            <button type="submit" onClick={this.handleSumbitChanges}>Apply</button>
                            <button type="submit" className="red" onClick={this.props.onClose}>Close</button>
                        </div>
                    </form>
                </div>
            </div>       
        );
        if(!this.props.isOpen) {
            modalForm = null;           
        };        
        return (
            <div id="modal">
                {modalForm}
            </div>
        );
    }
}

export default Modal;
