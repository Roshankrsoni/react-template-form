import React, { Component } from 'react'
import User from '../../shared/models/User.class';
import Input from '../FormTemplate/Input';
import Label from '../FormTemplate/Label';

export class NewUserForm extends Component {

    user = new User();

    constructor() {
        super();

        this.baseState = {
            firstname: { value: '', valid: false },
            lastname: { value: '', valid: false },
            email: { value: '', valid: false },
            description: { value: '', valid: false },
        }

        for (const key in this.baseState) { this.baseState[key]['name'] = key }

        this.state = {
            ...this.baseState,
            formValid: false
        }
    }

    handleValidForm(state) {

       for (const key in state) {
           if (state.hasOwnProperty(key)) {
               if (state[key].valid === false) return;
           }
       }

       this.setState({
           formValid: true
       });
    }

    handleChange = e => {
        let name = e.target.name;
        let value = e.target.value;

        let field = this.state[name];

        field.value = User.change(name, value);
        field.valid = User.isValid(name, value);

        return this.setState(prevState => ({
            ...prevState,
            [name]: field
        }), () => {
            this.handleValidForm(this.state)
        });
    }

    render() {

        return (
            <div>
                <form>
                    <div className="field">
                        <Label
                            title="mdr"
                            for={this.state.firstname.name}
                        />
                        <Input
                            value={this.state.firstname.value}
                            onChange={this.handleChange}
                            name={this.state.firstname.name}
                        />
                    </div>
                </form>
            </div>
        )
    }
}

export default NewUserForm
