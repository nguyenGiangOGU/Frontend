import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUsers,
  getUser,
  handleDeleteUser,
  handleCreateUser,
  handleUpdateUser
} from "../../services/userService";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        // Tạo ra các thuộc tính để tạo hoặc update user
      users: [],
      firstName: "",
      lastName: "",
      address: "",
      email: "",
      password: "",
      isCreateUser: false,
      isUpdate: false,
      userId: null,
    };
  }

  // Viết function để lấy tất cả user xuống
  getAllUser = async () => {
    let response = await getUser();
    this.setState({
      users: response?.users,
    });
  };
  async componentDidMount() {
    // Kích hoạt function để lấy tất cả user xuống
    this.getAllUser();
  }
  //   Tạo function để xóa user
  handleDeleteUser = async (id) => {
    handleDeleteUser(id).then(() => {
      this.getAllUser();
    });
  };
  // Bắt sự kiện onChange để lấy value của các ô input
  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  clearState = () => {
    this.setState({
      firstName: "",
      lastName: "",
      address: "",
      email: "",
      password: "",
    });
  };
  //   Tiến hành tạo user
  handleCreateUser = () => {
    // Check nếu update thì lấy user nào
    const user = !this.state.isUpdate
      ? {
          email: this.state.email,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          address: this.state.address,
        }
      : {
        id: this.state.userId,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          address: this.state.address,
        };

        // Kiểm tra nếu update = false thì mình tạo user 

    if (!this.state.isUpdate) {
      for (const key in user) {
        if (!user[key]) {
          window.alert(`${key} missing parameter !`);
          return;
        }
      }
         handleCreateUser(user).then(() => {
      this.getAllUser();
      this.clearState();
    });
    
        // Kiểm tra nếu update = true thì mình update user 
    } else {
        handleUpdateUser(user).then(() => {
         this.getAllUser();
         this.setState({isUpdate: false, isCreateUser: false})
      this.clearState();
        })
    }

 
  };

//   Tiến hành update user 
  handleOnUpdate = (user) => {
    this.setState({
      userId: user?.id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      address: user?.address,
      isUpdate: true,
      isCreateUser: true
    });
  };
  /** Life cycle
   * run component
   * 1. run contruct -> init state(biến muốn dùng)
   * 2.　Did mount
   * 3. Render
   *
   *
   */
  render() {
    const { isCreateUser } = this.state;
    return (
      <div className="user-container p-2">
        <div className="title text-center">Manage users</div>
        <div className="users-table mt-3 mx-1"></div>
        <div className="users-table">
          
          <div class="row">
            {isCreateUser && (
              <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                  {/* START FORM ĐỂ TẠO HOẶC UPDATE USER */}
                <form >
                  <legend className="text-center">{!this.state.isUpdate ?  "Form Create User" : "Form Update User"}</legend>
                  <div className="row">
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                     {!this.state.isUpdate &&  <div className="form-group">
                        <label for="">Email</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Input email"
                          onChange={this.handleChange}
                          value={this.state.email}
                          name="email"
                        />
                      </div> }
                      <div className="form-group">
                        <label for="">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Input first name"
                          onChange={this.handleChange}
                          value={this.state.firstName}
                          name="firstName"
                        />
                      </div>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                      {!this.state.isUpdate && <div className="form-group">
                        <label for="">Password</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Input password"
                          onChange={this.handleChange}
                          value={this.state.password}
                          name="password"
                        />
                      </div>}
                      <div className="form-group">
                        <label for="">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Input last name"
                          onChange={this.handleChange}
                          value={this.state.lastName}
                          name="lastName"
                        />
                      </div>
                    </div>

                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      <div className="form-group">
                        <label for="">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Input address"
                          onChange={this.handleChange}
                          value={this.state.address}
                          name="address"
                        />
                      </div>
                    </div>
                  </div>
                </form>
                <button
                  type="button"
                  className= {this.state.isUpdate ? "btn btn-danger" : "btn btn-primary  my-2"}
                  onClick={() => this.handleCreateUser()}
                >
                  {!this.state.isUpdate ? "Create User" : "Update User"}
                </button>
              </div>
            )}
              {/* END FORM ĐỂ TẠO HOẶC UPDATE USER */}

            <div
              className={
                isCreateUser
                  ? "col-xs-9 col-sm-9 col-md-9 col-lg-9"
                  : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
              }
            >
              <button
                type="button"
                className="btn btn-success  my-2"
                data-toggle="modal"
                data-target=".bd-example-modal-lg"
                onClick={() =>
                  this.setState({ isCreateUser: !this.state.isCreateUser })
                }
              >
               Create User
              </button>
{/*START BẢNG ĐỔ DỮ LIỆU USER */}
              <table id="customers">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {/* Render user ra giao diện */}
                  {this.state.users.map((user) => {
                    return (
                      <tr key={user?.id}>
                        <td>{user.email}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.address}</td>
                        <td>
                          <button
                            onClick={() => this.handleOnUpdate(user)}
                            type="button"
                            className="btn btn-success"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => this.handleDeleteUser(user?.id)}
                            type="button"
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              
{/*END BẢNG ĐỔ DỮ LIỆU USER */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
