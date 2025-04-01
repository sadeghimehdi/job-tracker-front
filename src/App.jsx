import './App.css'

function App() {

  return (
    <div className={"container"}>
      <div className={"w-100 d-flex align-items-center justify-content-center pt-5 mt-5"}>
        <h1>Job Tracker</h1>
      </div>

      <div className={"w-100 d-flex align-items-center justify-content-center pt-5 mt-5"}>
        <div className={"innerContainer w-50 d-flex flex-column align-items-center justify-content-center"}>
          <h3 className={"mb-5"}>Start with upload a json file</h3>
          <div className={"w-100 d-flex flex-column align-items-center justify-content-between mb-5"}>
            <p>if you don't have the json file example, you can download it here</p>
            <a href={`./example.json`} download>
              <button className="btn btn-primary">Download</button>
            </a>
          </div>
          <div className="mb-3">
            <input className="form-control" type="file" id="formFile"/>
          </div>
        </div>
      </div>

      <div className={"d-flex align-items-center justify-content-between column-gap-5 pt-5"}>

        <div className={"innerContainer w-100 d-flex flex-column"}>
          <div className={"w-100 d-flex align-items-center justify-content-center mb-3"}>
            <h3>Hash table search</h3>
          </div>
          <div className={"d-flex w-100 align-items-center justify-content-center column-gap-5"}>
            <div className="form-floating">
              <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
              <label htmlFor="floatingInput">Sesrch in hash table</label>
            </div>
            <button type="button" className="btn btn-primary">Search</button>
          </div>
        </div>

        <div className={"innerContainer w-100 d-flex flex-column"}>
          <div className={"w-100 d-flex align-items-center justify-content-center mb-3"}>
            <h3>Boyer moore string search</h3>
          </div>
          <div className={"d-flex w-100 align-items-center justify-content-center column-gap-5"}>
            <div className="form-floating">
              <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
              <label htmlFor="floatingInput">search in Boyer moore string</label>
            </div>
            <button type="button" className="btn btn-primary">Search</button>
          </div>
        </div>

      </div>

      <div className={"d-flex align-items-center justify-content-between column-gap-5 pt-5"}>

        <div className={"innerContainer w-100 d-flex flex-column"}>
          <div className={"w-100 d-flex align-items-center justify-content-center mb-3"}>
            <h3>Binary search</h3>
          </div>
          <div className={"d-flex w-100 align-items-center justify-content-center column-gap-5"}>
            <div className="form-floating">
              <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
              <label htmlFor="floatingInput">Binary search</label>
            </div>
            <button type="button" className="btn btn-primary">Search</button>
          </div>
        </div>

        <div className={"innerContainer w-100 d-flex flex-column"}>
          <div className={"w-100 d-flex align-items-center justify-content-center mb-3"}>
            <h3>Something search</h3>
          </div>
          <div className={"d-flex w-100 align-items-center justify-content-center column-gap-5"}>
            <div className="form-floating">
              <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
              <label htmlFor="floatingInput">Something search</label>
            </div>
            <button type="button" className="btn btn-primary">Search</button>
          </div>
        </div>

      </div>

      <div className={"resultsContainer mt-5 mb-5"}>
        <div className={"w-100 d-flex align-items-center justify-content-center mb-3"}>
            <h3 className={"text-center"}>Results <h5>Time took to search: 1 Year</h5></h3>
        </div>

        <div className={"resultItem"}>
          <h3>Job id: <p className={"text-danger"}>1</p></h3>
          <h3>Job name: <p className={"text-danger"}>Software developer</p></h3>
          <h3>Company: <p className={"text-danger"}>NHL Stenden</p></h3>
          <h3>Email: <p className={"text-danger"}>nhlstendent@gmail.com</p></h3>
        </div>
      </div>

    </div>
  )
}

export default App
