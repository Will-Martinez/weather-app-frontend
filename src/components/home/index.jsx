import "./index.css";
import jobs from "../../public/images/jobs.png"
import users from "../../public/images/users.png";
import reports from "../../public/images/reports.png";
import Footer from "../footer";

function redirectToUsersTable()
{
    window.location.href = "/users";
}

function redirectToReports()
{
    window.location.href = "/reports";
}

export default function Home() {
    return (
        <div className="card-deck">
            <div className="card" id="card_dashboard">
                <div className="card-content">
                    <img src={reports}></img>
                    <div className="content">
                        <hr></hr>
                        <p>
                            <h4>Reports Module</h4>
                        </p>
                        <p>
                            <button onClick={redirectToReports} type="button" className="button is-primary is-rounded is-normal is-outlined">
                                Access
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            <div className="card" id="card_jobs">
                <div className="card-content">
                    <img src={jobs}></img>
                    <div className="content">
                        <hr></hr>
                        <p>
                            <h4>Jobs Module</h4>
                        </p>
                        <p>
                            <button type="button" className="button is-primary is-rounded is-normal is-outlined">
                                Access
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            <div className="card" id="card_users">
                <div className="card-content">
                    <img src={users}></img>
                    <div className="content">
                        <hr></hr>
                        <p>
                            <h4>Users Module</h4>
                        </p>
                        <p>
                            <button onClick={redirectToUsersTable} type="button" className="button is-primary is-rounded is-normal is-outlined">
                                Access
                            </button>
                        </p>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}