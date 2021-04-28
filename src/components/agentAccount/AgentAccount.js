import React from 'react'
import AgentNavbar from '../layouts/AgentNavbar'
import {AccountCircle, HomeOutlined, CreditCard, Grade, Security, NotificationsActive} from '@material-ui/icons'
import {Link} from 'react-router-dom'
import '../styles/Account.css'

function AgentAccount() {
    return (
        <>
            <AgentNavbar />
            <div className="container" style={{
                paddingTop: "80px"
            }}>
                <h2>My Account</h2>
                <div className="row py-4">
                    <div className="col-lg-4 col-md-4 mb-4">
                        <div className="card border rounded">
                            <div className="card-body">
                                <AccountCircle className="account-icons"/>
                                <h4 className="account-Profile mx-auto py-2">
                                    Account Profile
                                </h4>
                                <p className="account-text mx-auto">
                                    Update your account profile
                                </p>
                                <button className="btn-view">
                                    <Link className="view-link" to="/agent-account/profile">
                                        View
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 mb-4">
                        <div className="card border rounded">
                            <div className="card-body">
                                <HomeOutlined className="account-icons"/>
                                <h4 className="account-Profile mx-auto py-2">
                                    My Estates
                                </h4>
                                <p className="account-text mx-auto">
                                    Update your estates details
                                </p>
                                <button className="btn-view">
                                    <Link className="view-link" to="/agent-account/my-estates">
                                        View
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 mb-4">
                        <div className="card border rounded">
                            <div className="card-body">
                                <CreditCard className="account-icons"/>
                                <h4 className="account-Profile mx-auto py-2">
                                    Subscription
                                </h4>
                                <p className="account-text mx-auto">
                                    Review and pay your monthly subscription
                                </p>
                                <button className="btn-view">
                                    <Link className="view-link" to="/agent-account/subscription">
                                        View
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-4 mb-4">
                        <div className="card border rounded">
                            <div className="card-body">
                                <Grade className="account-icons"/>
                                <h4 className="account-Profile mx-auto py-2">Ratings</h4>
                                <p className="account-text mx-auto">See your performance as an agent</p>
                                <button className="btn-view">
                                    <Link className="view-link" to="/agent/ratings">View</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 mb-4">
                        <div className="card border rounded">
                            <div className="card-body">
                                <Security className="account-icons"/>
                                <h4 className="account-Profile mx-auto py-2">Login & security</h4>
                                <p className="account-text mx-auto">Edit your password/secure your account</p>
                                <button className="btn-view">
                                    <Link className="view-link" to="/agent/login&security">View</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 mb-4">
                        <div className="card border rounded">
                            <div className="card-body">
                                <NotificationsActive className="account-icons"/>
                                <h4 className="account-Profile mx-auto py-2">Notifications</h4>
                                <p className="account-text mx-auto">Set your notifications preferences</p>
                                <button className="btn-view">
                                    <Link className="view-link" to="/agent/notifications">View</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AgentAccount
