const Employee = React.createClass({

    getInitialState: function () {
        return {
            name: '',
            officeContact: '',
            personalContact: '',
            address: '',
            id: '',
            text: 'Save',
            allContacts: []
        };
    },

    componentDidMount() {
        $.ajax({
            url: "api/getContacts",
            type: "GET",
            dataType: 'json',
            ContentType: 'application/json',
            success: function (data) {
                this.setState({allContacts: data});
            }.bind(this),
            error: function (jqXHR) {
                console.log(jqXHR);

            }.bind(this)
        });
    },

    editContact(user) {
        this.setState({
            name: user.name,
            officeContact: user.officeContact,
            personalContact: user.personalContact,
            address: user.address,
            id: user._id,
            text: 'Update'
        });
    },

    onChange: function (value) {
        this.setState({
            [value.target.name]: value.target.value
        });
    },

    onClick: function () {

        let Url = "";
        if (this.state.text === "Save") {
            Url = "/api/addContact";
        }
        else {
            Url = "/api/updateContact";
        }
        var userDetail = {
            'name': this.state.name,
            "officeContact": this.state.officeContact,
            "personalContact": this.state.personalContact,
            "address": this.state.address,
            'id': this.state.id,
        };
        $.ajax({
            url: Url,
            dataType: 'json',
            type: 'POST',
            data: userDetail,
            success: function (data) {
                alert(data.data);
                this.setState(this.getInitialState());
                this.componentDidMount();

            }.bind(this),
            error: function (xhr, status, error) {
                alert(error);
            }.bind(this)
        });
    },

    render: function () {

        const myStyle = {
            fontFamily: 'Algerian san-serif',
            padding: '30px',
            textAlign: 'center',
            color: 'white',
            backgroundColor: 'black',
            fontFamily:'Algerian',
            border:0,
            borderRadius:4,
            marginBottom:10
        };

        const myStyle1 = {
            fontFamily: 'Algerian san-serif',
            padding: '30px',
            textAlign: 'center',
            color: 'black',
            backgroundColor: 'white',
            fontFamily:'Algerian',
            border:'1px solid black',
            borderRadius:4,
            marginTop:'-10px'

        };



        const rowStyle={
            padding:'10px'
        }

        return (

            <div className="container" style={{marginTop: '30px'}}>
                <h1 className="text-center" style={myStyle1}>Contact Application</h1>

                <div className="col-sm-4">
    <h1 className="text-center" style={myStyle}>Add Contact</h1>



    <form style={{marginTop:'0px'}}>
                    <div >
                        <div className="form-group">
                            <label v-for="new_contact_title">Name:</label>
                            <input type="text" className="form-control" value={this.state.name} name="name"
                                   onChange={this.onChange} placeholder="Your Name"/>
                            <input type="hidden" value={this.state.id} name="id"/>
                        </div>
                        <div className="form-group">
                            <label v-for="new_office_mobNo">Office Mobile No:</label>
                            <input type="number" className="form-control" value={this.state.officeContact}
                                   name="officeContact" onChange={this.onChange} placeholder="+00-00000-00000"/>
                        </div>
                        <div className="form-group">
                            <label v-for="new_mobNo">Personal Mobile No:</label>
                            <input type="number" className="form-control" value={this.state.personalContact}
                                   name="personalContact" onChange={this.onChange} placeholder="+00-00000-00000"/>
                        </div>
                        <div className="form-group">
                            <label v-for="new_address">Address:</label>
                            <textarea rows={4} className="form-control" value={this.state.address} name="address"
                                   onChange={this.onChange} placeholder="Address"/>
                        </div>
                        <input className="btn btn-primary" style={{float: 'left',backgroundColor:'black',padding:'10px',width:'100%'}} type="button"
                               value={this.state.text} onClick={this.onClick}/>

                    </div>
                </form>
</div>
                <div className="col-sm-3"></div>
                <div className="col-sm-5">
                    <h1 className="text-center" style={myStyle}>My Contacts</h1>

                <div style={{marginTop:'30px'}}>

                    <table cellSpacing={'10px'} cellPadding={'10px'} className="table table-hover" style={rowStyle}>

                        <thead style={rowStyle}>
                        <th>Name</th>
                        <th>Office Contact</th>
                        <th>Personal Contact</th>
                        <th>Address</th>
                        </thead>
                        <tbody>
                        {this.state.allContacts.map((user, index) => (
                            <tr style={{cursor:'pointer'}} key={index} onClick={() => {
                                this.editContact(user)
                            }}>
                                <td>{user.name}</td>
                                <td>{user.officeContact}</td>
                                <td>{user.personalContact}</td>
                                <td>{user.address}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        );
    }
});



ReactDOM.render(<Employee/>, document.getElementById('root'));