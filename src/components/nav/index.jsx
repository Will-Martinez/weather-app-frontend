import weahterForecast from "../../public/images/weather-forecast.png"

export default function Nav() {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">

        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasic">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasic" className="navbar-menu">
        <div className="navbar-start">
          <div className="navbar-brand">
            <a className="navbar-item" href="/home">
              <img src={weahterForecast}></img>
            </a>
            <a className="navbar-item" /* href="https://github.com/Will-Martinez/Supply_Sage" */>
              <strong>Weather Forecast app</strong>
            </a>
          </div>
        </div>
      </div>
    </nav>

    )
}