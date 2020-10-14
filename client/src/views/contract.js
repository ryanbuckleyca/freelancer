import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import SectionHeader from '../components/section-header';
import CardTitle from '../components/card-title';
import CardForm from '../components/card-form';
import contract from '../images/finance_analytics_.svg';

const url = process.env.REACT_APP_API_URL || 'http://localhost:9000';

class Contract extends Component {

  state = [{
    client_id: '',
    user_id: '',
    due_date: '',
    paid: ''
  }]

  //TODO: create updateAPI method to DRY-up these calls
  async getContract(id) {
    try {
      const res = await fetch(`${url}/api/contracts/${id}`)
      const data = await res.json()
      return data
    } catch(err) {
      console.log('getContract error: ', err)
    }
  };

  //TODO: add authentication and validation
  async createContract(contract) {
    try {
      const res = await fetch(`${url}/api/contracts/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contract)
      })
      const data = await res.json()
      return data
    } catch(err) {
      console.log('createContract error: ', err)
    }
  };

  //TODO: add authentication and validation
  async updateContract(contract) {
    console.log('updateContract called')
    try {
      const res = await fetch(`${url}/api/contracts/update/${contract.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contract)
      })
      const data = await res.json()
      return data
    } catch(err) {
      console.log('updateContract error: ', err)
    }
  };

  async componentDidMount(props) {
    // if(this.params.id) {
    //   const contract = await this.getContract(this.params.id)
    // }
    // else {
    //   const contract = await this.getContract(this.params.id)
    // }
    console.log('found contract: ', contract)
    try {
      this.setState(contract)
      console.log('compondedDidMount state: ', this.state)
    } catch(err) {
      this.setState(err)
    }
  }

  // Update contract
  handleUserSubmit = async (e) => {
    e.preventDefault();
    console.log('this.state value when handleUserSubmit is called: ', this.state);
    try {
      const { client_id, due_date, paid } = this.state;

      if (client_id && due_date && paid) {
        await this.updateContract(this.state)
        console.log('contract updated')
      }
      else {
        console.log('One or more fields are null or undefined')
      }
    }
    catch(err) { console.log(err) }
  }

  changeUserHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      ...this.state, [name]: value
    })
  }

  render() {
    return(
      <div className="profile">
        <hr className="spacer" />
        <CardTitle
          img={contract}
          title="Contract time!"
          thisClass="card-md"
          text="You can upload invoices here to automatically generate new contracts, or manually enter the information below."
        />

        <hr className="spacer" />

        <form className="form-wrapper">
            <fieldset>
              <label className="form-label" htmlFor="client">Client*</label>
              <input className="form-input" type="select" id="client" name="client"
                     value={this.state.client || ''}
                     onChange={this.changeUserHandler} />
            </fieldset>
            <fieldset className="mr-sm-3">
              <label className="form-label" htmlFor="due_date">Due Date*</label>
              <input className="form-input" type="text" id="due_date" name="due_date"
                     value={this.state.due_date || ''}
                     onChange={this.changeUserHandler} />
            </fieldset>
            <fieldset>
              <label className="form-label" htmlFor="paid">Paid*</label>
              <input className="form-input" type="radio" id="paid" name="paid"
                     value={this.state.paid || ''}
                     onChange={this.changeUserHandler}  />
            </fieldset>
            <button onClick={this.handleUserSubmit} className="btn btn-primary d-block mt-4 mx-auto d-md-none">Submit contract</button>
        </form>

        <hr className="spacer" />
      </div>
    );
  }
}

export default withAuth0(Contract);
