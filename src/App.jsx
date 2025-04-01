import './App.css';
import { useState } from "react";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [searchKey, setSearchKey] = useState('company'); // Dropdown: "company" or "position"
  const [searchResults, setSearchResults] = useState([]);

  const [bmSearchKey, setBmSearchKey] = useState('company'); // Options: id, position, company, date_applied, status, priority
  const [bmSearchTerm, setBmSearchTerm] = useState('');
  const [bmSearchResults, setBmSearchResults] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }
    const formData = new FormData();
    formData.append('files', selectedFile);

    try {
      const response = await fetch('http://localhost:8080/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadStatus('File uploaded successfully.');
      } else {
        setUploadStatus('File upload failed.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('An error occurred while uploading the file.');
    }
  };

  const handleSearch = async () => {
    if (!searchTerm) {
      alert("Please enter a search term.");
      return;
    }

    try {
      let response;
      if (
          !isNaN(parseInt(searchTerm)) &&
          parseInt(searchTerm).toString() === searchTerm.trim()
      ) {
        response = await fetch(`http://localhost:8080/application/${searchTerm}`, {
          method: 'GET',
        });
      } else {
        response = await fetch(
            `http://localhost:8080/applications/search?key=${searchKey}&value=${searchTerm}`,
            {
              method: 'GET',
            }
        );
      }

      if (response.ok) {
        console.error(response)
        let data = await response.json();
        if (!Array.isArray(data)) {
          data = [data];
        }
        setSearchResults(data);
        setUploadStatus('Hash table search completed successfully.');
      } else {
        setUploadStatus('Hash table search failed.');
      }
    } catch (error) {
      console.error('Search error:', error);
      setUploadStatus('An error occurred while searching.');
    }
  };

  const handleBMSearch = async () => {
    if (!bmSearchTerm) {
      alert("Please enter a search term for Boyer Moore search.");
      return;
    }
    try {
      const response = await fetch(
          `http://localhost:8080/applications/bayer-search?key=${bmSearchKey}&value=${bmSearchTerm}`,
          { method: 'GET' }
      );

      if (response.ok) {
        let data = await response.json();
        if (!Array.isArray(data)) {
          data = [data];
        }
        setBmSearchResults(data);
        setUploadStatus('Boyer Moore search completed successfully.');
      } else {
        setUploadStatus('Boyer Moore search failed.');
      }
    } catch (error) {
      console.error('Boyer Moore search error:', error);
      setUploadStatus('An error occurred while performing BM search.');
    }
  };

  return (
      <div className="container">
        <div className="w-100 d-flex align-items-center justify-content-center pt-5 mt-5">
          <h1>Job Tracker</h1>
        </div>

        <div className="w-100 d-flex align-items-center justify-content-center pt-5 mt-5">
          <div className="innerContainer w-50 d-flex flex-column align-items-center justify-content-center">
            <h3 className="mb-5">Start with uploading a JSON file</h3>
            <div className="w-100 d-flex flex-column align-items-center justify-content-between mb-5">
              <p>If you don't have the JSON file example, you can download it here</p>
              <a href="./example.json" download>
                <button className="btn btn-primary">Download</button>
              </a>
            </div>
            <div className="mb-3">
              <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  onChange={handleFileChange}
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleFileUpload}>
              Upload File
            </button>
            {uploadStatus && <p>{uploadStatus}</p>}
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between column-gap-5 pt-5">
          <div className="innerContainer w-100 d-flex flex-column">
            <div className="w-100 d-flex align-items-center justify-content-center mb-3">
              <h3>Hash Table Search</h3>
            </div>
            <div className="d-flex w-100 align-items-center justify-content-center column-gap-5">
              <div className="form-floating">
                <select
                    className="form-select"
                    id="searchKeySelect"
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                >
                  <option value="company">Company</option>
                  <option value="position">Application Name</option>
                </select>
                <label htmlFor="searchKeySelect">Search By</label>
              </div>
              <div className="form-floating">
                <input
                    type="text"
                    className="form-control"
                    id="searchTermInput"
                    placeholder="Enter search term"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <label htmlFor="searchTermInput">Search Term</label>
              </div>
              <button type="button" className="btn btn-primary" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>

          <div className="innerContainer w-100 d-flex flex-column">
            <div className="w-100 d-flex align-items-center justify-content-center mb-3">
              <h3>Boyer Moore String Search</h3>
            </div>
            <div className="d-flex w-100 align-items-center justify-content-center column-gap-5">
              <div className="form-floating">
                <select
                    className="form-select"
                    id="bmSearchKey"
                    value={bmSearchKey}
                    onChange={(e) => setBmSearchKey(e.target.value)}
                >
                  <option value="id">Job id</option>
                  <option value="position">Position</option>
                  <option value="company">Company</option>
                  <option value="date_applied">Date Applied</option>
                  <option value="status">Status</option>
                  <option value="priority">Priority</option>
                </select>
                <label htmlFor="bmSearchKey">Search By</label>
              </div>
              <div className="form-floating">
                <input
                    type="text"
                    className="form-control"
                    id="bmSearchTerm"
                    placeholder="Enter search term"
                    value={bmSearchTerm}
                    onChange={(e) => setBmSearchTerm(e.target.value)}
                />
                <label htmlFor="bmSearchTerm">Search Term</label>
              </div>
              <button type="button" className="btn btn-primary" onClick={handleBMSearch}>
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between column-gap-5 pt-5">
          <div className="innerContainer w-100 d-flex flex-column">
            <div className="w-100 d-flex align-items-center justify-content-center mb-3">
              <h3>Binary Search</h3>
            </div>
            <div className="d-flex w-100 align-items-center justify-content-center column-gap-5">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInputBinary" placeholder="Enter search term"/>
                <label htmlFor="floatingInputBinary">Binary Search</label>
              </div>
              <button type="button" className="btn btn-primary">Search</button>
            </div>
          </div>

          <div className="innerContainer w-100 d-flex flex-column">
            <div className="w-100 d-flex align-items-center justify-content-center mb-3">
              <h3>Something Search</h3>
            </div>
            <div className="d-flex w-100 align-items-center justify-content-center column-gap-5">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInputSomething" placeholder="Enter search term"/>
                <label htmlFor="floatingInputSomething">Something Search</label>
              </div>
              <button type="button" className="btn btn-primary">Search</button>
            </div>
          </div>
        </div>

        <div className="resultsContainer mt-5 mb-5">
          <div className="w-100 d-flex align-items-center justify-content-center mb-3">
            <h3 className="text-center">
              Hash Table Search Results <h5>Time took to search: 1 Year</h5>
            </h3>
          </div>
          {searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                  <div key={index} className="resultItem">
                    <h3>
                      Job id: <span className="text-danger">{result.id}</span>
                    </h3>
                    <h3>
                      Position: <span className="text-danger">{result.position}</span>
                    </h3>
                    <h3>
                      Company: <span className="text-danger">{result.company}</span>
                    </h3>
                    <h3>
                      Date Applied: <span className="text-danger">{result.date_applied}</span>
                    </h3>
                    <h3>
                      Status: <span className="text-danger">{result.status}</span>
                    </h3>
                    <h3>
                      Priority: <span className="text-danger">{result.priority}</span>
                    </h3>
                  </div>
              ))
          ) : (
              <div className="resultItem">
                <h3>No results found.</h3>
              </div>
          )}
        </div>

        <div className="resultsContainer mt-5 mb-5">
          <div className="w-100 d-flex align-items-center justify-content-center mb-3">
            <h3 className="text-center">Boyer Moore Search Results</h3>
          </div>
          {bmSearchResults.length > 0 ? (
              bmSearchResults.map((result, index) => (
                  <div key={index} className="resultItem">
                    <h3>
                      Job id: <span className="text-danger">{result.id}</span>
                    </h3>
                    <h3>
                      Position: <span className="text-danger">{result.position}</span>
                    </h3>
                    <h3>
                      Company: <span className="text-danger">{result.company}</span>
                    </h3>
                    <h3>
                      Date Applied: <span className="text-danger">{result.date_applied}</span>
                    </h3>
                    <h3>
                      Status: <span className="text-danger">{result.status}</span>
                    </h3>
                    <h3>
                      Priority: <span className="text-danger">{result.priority}</span>
                    </h3>
                  </div>
              ))
          ) : (
              <div className="resultItem">
                <h3>No Boyer Moore search results found.</h3>
              </div>
          )}
        </div>
      </div>
  );
}

export default App;
