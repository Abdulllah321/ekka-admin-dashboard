import { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import { User } from "../utils/types";
import axios from "axios";
import { getImageUrl } from "../constants";
import ImageUpload from "../components/common/ImageUpload";
import DataTable from "../constants/dataTablesUtils";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    profileImage: "",
  });

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/users/all");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleFileChange = (image: string) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      profileImage: image,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", newUser);
      fetchUsers(); // Refresh user list after adding
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout>
      <div className="content">
        <div className="breadcrumb-wrapper breadcrumb-contacts">
          <div>
            <h1>User List</h1>
            <p className="breadcrumbs">
              <span>
                <a href="index.html">Home</a>
              </span>
              <span>
                <i className="mdi mdi-chevron-right" />
              </span>
              User
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="ec-vendor-list card card-default">
              <div className="card-body">
                <div className="table-responsive">
                  <DataTable className="table">
                    <thead>
                      <tr>
                        <th>Profile</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Total Buy</th>
                        <th>Role</th>
                        <th>Join On</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="text-center">
                            No data available in table
                          </td>
                        </tr>
                      ) : (
                        users.map((user) => (
                          <tr key={user.id}>
                            <td>
                              <img
                                className="vendor-thumb"
                                src={getImageUrl(user.profileImage!)}
                                alt="user profile"
                              />
                            </td>
                            <td>{user.firstName + " " + user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.totalPurchases}</td>
                            <td>{user.role}</td>
                            <td>
                              {new Date(user.createdAt!).toLocaleDateString()}
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-outline-success"
                              >
                                Info
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </DataTable>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add User Modal  */}
        <div
          className="modal fade modal-add-contact"
          id="addUser"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header px-4">
                  <h5 className="modal-title" id="exampleModalCenterTitle">
                    Add New User
                  </h5>
                </div>
                <div className="modal-body px-4">
                  <div className="form-group row mb-6">
                    <label
                      htmlFor="coverImage"
                      className="col-sm-4 col-lg-2 col-form-label"
                    >
                      User Image
                    </label>
                    <ImageUpload
                      value={newUser.profileImage!}
                      onSuccess={handleFileChange}
                      clearImage={() =>
                        setNewUser({ ...newUser, profileImage: "" })
                      }
                    />
                  </div>
                  <div className="row mb-2">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label htmlFor="firstName">First name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          name="firstName"
                          value={newUser.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label htmlFor="lastName">Last name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          name="lastName"
                          value={newUser.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group mb-4">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={newUser.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group mb-4">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                          type="text"
                          className="form-control"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={newUser.phoneNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer px-4">
                  <button
                    type="button"
                    className="btn btn-secondary btn-pill"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-pill">
                    Save Contact
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UsersPage;
