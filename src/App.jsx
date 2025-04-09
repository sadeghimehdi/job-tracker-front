import './App.css';
import { useState } from "react";

function App() {
  // File upload states
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  // Hash Table search states
  const [searchTerm, setSearchTerm] = useState('');
  const [searchKey, setSearchKey] = useState('company');
  const [searchResults, setSearchResults] = useState([]);

  // Boyer Moore search states
  const [bmSearchKey, setBmSearchKey] = useState('company');
  const [bmSearchTerm, setBmSearchTerm] = useState('');

  // Binary search states
  const [binarySearchKey, setBinarySearchKey] = useState('company');
  const [binarySearchTerm, setBinarySearchTerm] = useState('');

  // Bloom search state (only one key: date)
  const [bloomSearchDate, setBloomSearchDate] = useState('');

  // Priority Queue sort states
  const [sortOption, setSortOption] = useState('peek');
  const [priorityResults, setPriorityResults] = useState(null);

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
            { method: 'GET' }
        );
      }

      if (response.ok) {
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
        setSearchResults(data);
        setUploadStatus('Boyer Moore search completed successfully.');
      } else {
        setUploadStatus('Boyer Moore search failed.');
      }
    } catch (error) {
      console.error('Boyer Moore search error:', error);
      setUploadStatus('An error occurred while performing BM search.');
    }
  };

  const handleBinarySearch = async () => {
    if (!binarySearchTerm) {
      alert("Please enter a search term for Binary search.");
      return;
    }
    try {
      const response = await fetch(
          `http://localhost:8080/binarySearch`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key: binarySearchKey, value: binarySearchTerm }),
          }
      );

      if (response.ok) {
        let data = await response.json();
        if (!Array.isArray(data)) {
          data = [data];
        }
        setSearchResults(data);
        setUploadStatus('Binary search completed successfully.');
      } else {
        setUploadStatus('Binary search failed.');
      }
    } catch (error) {
      console.error('Binary search error:', error);
      setUploadStatus('An error occurred while performing Binary search.');
    }
  };

  const handleBloomSearch = async () => {
    if (!bloomSearchDate) {
      alert("Please enter a date for Bloom search.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/bloom/check-date/${bloomSearchDate}`, {
        method: 'GET',
      });

      if (response.ok) {
        let data = await response.json();
        if (!Array.isArray(data)) {
          data = [data];
        }
        setSearchResults(data);
        setUploadStatus('Bloom search completed successfully.');
      } else {
        setUploadStatus('Bloom search failed.');
      }
    } catch (error) {
      console.error('Bloom search error:', error);
      setUploadStatus('An error occurred while performing Bloom search.');
    }
  };

  const handlePrioritySort = async () => {
    let endpoint = "";
    if (sortOption === "peek") {
      endpoint = "http://localhost:8080/priorityQueue/peek";
    } else if (sortOption === "poll") {
      endpoint = "http://localhost:8080/priorityQueue/poll";
    } else if (sortOption === "sorted") {
      endpoint = "http://localhost:8080/priorityQueue/sorted";
    }
    try {
      const response = await fetch(endpoint, { method: "GET" });
      if (response.ok) {
        let data = await response.json();
        setPriorityResults(data);
        setUploadStatus(`Priority queue ${sortOption} completed successfully.`);
      } else {
        setUploadStatus(`Priority queue ${sortOption} failed.`);
      }
    } catch (error) {
      console.error("Priority queue sort error:", error);
      setUploadStatus("An error occurred while performing priority queue sort.");
    }
  };

  // Revised Combined Results Section: Render all search results along with priority queue results
  const renderResults = () => {
    const noSearchResults = !searchResults || searchResults.length === 0;
    const noPriorityResults = !priorityResults;
    if (noSearchResults && noPriorityResults) {
      return (
          <div className="resultItem">
            <h3>No results found.</h3>
          </div>
      );
    }

    return (
        <>
          {searchResults && searchResults.length > 0 && (
              <>
                <h3 className="text-center">
                  Search Results{" "}
                  {searchResults[0]?.executionTime && (
                      <h5>Time took to search: {searchResults[0]?.executionTime} ms</h5>
                  )}
                </h3>
                {/* Loop over every entry in the searchResults array */}
                {searchResults.map((entry, entryIndex) => {
                  // Check if the entry has a "results" property
                  if (Object.prototype.hasOwnProperty.call(entry, "results")) {
                    // If results is an array, iterate over it
                    if (Array.isArray(entry.results)) {
                      return entry.results.map((result, index) => (
                          <div key={`entry-${entryIndex}-result-${index}`} className="resultItem">
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
                      ));
                    } else if (entry.results) {
                      // In case it is a single object wrapped under "results"
                      let result = entry.results;
                      return (
                          <div key={`entry-${entryIndex}`} className="resultItem">
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
                      );
                    }
                  } else {
                    // Otherwise, assume the entry is a plain result object
                    return (
                        <div key={`entry-${entryIndex}`} className="resultItem">
                          <h3>
                            Job id: <span className="text-danger">{entry.id}</span>
                          </h3>
                          <h3>
                            Position: <span className="text-danger">{entry.position}</span>
                          </h3>
                          <h3>
                            Company: <span className="text-danger">{entry.company}</span>
                          </h3>
                          <h3>
                            Date Applied: <span className="text-danger">{entry.date_applied}</span>
                          </h3>
                          <h3>
                            Status: <span className="text-danger">{entry.status}</span>
                          </h3>
                          <h3>
                            Priority: <span className="text-danger">{entry.priority}</span>
                          </h3>
                        </div>
                    );
                  }
                })}
              </>
          )}
          {priorityResults && (
              <>
                <h3 className="text-center">
                  Priority Queue Results{" "}
                  {priorityResults.executionTime && (
                      <h5>Time took: {priorityResults.executionTime} ms</h5>
                  )}
                </h3>
                {Array.isArray(priorityResults) ? (
                    priorityResults.map((result, index) => (
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
                      <h3>
                        Job id: <span className="text-danger">{priorityResults.element?.id}</span>
                      </h3>
                      <h3>
                        Position: <span className="text-danger">{priorityResults.element?.position}</span>
                      </h3>
                      <h3>
                        Company: <span className="text-danger">{priorityResults.element?.company}</span>
                      </h3>
                      <h3>
                        Date Applied: <span className="text-danger">{priorityResults.element?.date_applied}</span>
                      </h3>
                      <h3>
                        Status: <span className="text-danger">{priorityResults.element?.status}</span>
                      </h3>
                      <h3>
                        Priority: <span className="text-danger">{priorityResults.element?.priority}</span>
                      </h3>
                    </div>
                )}
              </>
          )}
        </>
    );
  };

  return (
      <div className="container">
        {/* File Upload Section */}
        <div className="w-100 d-flex align-items-center justify-content-center pt-5 mt-5">
          <h1>Job Tracker</h1>
        </div>
        <div className="w-100 d-flex align-items-center justify-content-center pt-5 mt-5">
          <div className="innerContainer w-50 d-flex flex-column align-items-center justify-content-center">
            <h3 className="mb-5">Start with uploading a JSON file</h3>
            <div className="w-100 d-flex align-items-center justify-content-between mb-5">
              <p>If you don't have the JSON file example, you can download it here</p>
              <a href="./src/example.json" download>
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

        {/* Search Sections */}
        <div className="d-flex align-items-center justify-content-between column-gap-5 pt-5">
          {/* Hash Table Search */}
          <div className="innerContainer w-100 d-flex flex-column">
            <div className="w-100 d-flex align-items-center justify-content-center mb-3">
              <h3>Hash Table Search</h3>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <div className="form-floating mb-1">
                <small className="text-muted">Enter key (e.g. company or position)</small>
              </div>
              <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="searchKeyInput"
                    placeholder="Enter key"
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                />
                <label htmlFor="searchKeyInput">Search By Key</label>
              </div>
              <div className="form-floating mb-3">
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

          {/* Boyer Moore Search */}
          <div className="innerContainer w-100 d-flex flex-column">
            <div className="w-100 d-flex align-items-center justify-content-center mb-3">
              <h3>Boyer Moore String Search</h3>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <div className="form-floating mb-1">
                <small className="text-muted">
                  Enter key (e.g. id, position, company, date_applied, status, priority)
                </small>
              </div>
              <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="bmSearchKeyInput"
                    placeholder="Enter key"
                    value={bmSearchKey}
                    onChange={(e) => setBmSearchKey(e.target.value)}
                />
                <label htmlFor="bmSearchKeyInput">Search By Key</label>
              </div>
              <div className="form-floating mb-3">
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

        {/* Binary and Bloom Search Section */}
        <div className="d-flex align-items-center justify-content-between column-gap-5 pt-5">
          {/* Binary Search */}
          <div className="innerContainer w-100 d-flex flex-column">
            <div className="w-100 d-flex align-items-center justify-content-center mb-3">
              <h3>Binary Search</h3>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <div className="form-floating mb-1">
                <small className="text-muted">
                  Enter key (e.g. id, position, company, date_applied, status, priority)
                </small>
              </div>
              <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="binarySearchKeyInput"
                    placeholder="Enter key"
                    value={binarySearchKey}
                    onChange={(e) => setBinarySearchKey(e.target.value)}
                />
                <label htmlFor="binarySearchKeyInput">Search By Key</label>
              </div>
              <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="binarySearchTerm"
                    placeholder="Enter search term"
                    value={binarySearchTerm}
                    onChange={(e) => setBinarySearchTerm(e.target.value)}
                />
                <label htmlFor="binarySearchTerm">Search Term</label>
              </div>
              <button type="button" className="btn btn-primary" onClick={handleBinarySearch}>
                Search
              </button>
            </div>
          </div>

          {/* Bloom Search */}
          <div className="innerContainer w-100 d-flex flex-column">
            <div className="w-100 d-flex align-items-center justify-content-center mb-3">
              <h3>Bloom Search</h3>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="bloomSearchDate"
                    placeholder="Enter date (e.g. 2022-12-31)"
                    value={bloomSearchDate}
                    onChange={(e) => setBloomSearchDate(e.target.value)}
                />
                <label htmlFor="bloomSearchDate">Date Applied</label>
              </div>
              <button type="button" className="btn btn-primary" onClick={handleBloomSearch}>
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Priority Queue Sort Section */}
        <div className="d-flex align-items-center justify-content-center column-gap-5 pt-5">
          <div className="innerContainer w-100 d-flex flex-column align-items-center justify-content-center">
            <div className="form-floating mb-1">
              <small className="text-muted">Select a sort option: peek, poll, or sorted</small>
            </div>
            <div className="form-floating mb-3">
              <select
                  className="form-select"
                  id="sortOption"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="peek">Peek</option>
                <option value="poll">Poll</option>
                <option value="sorted">Sorted</option>
              </select>
              <label htmlFor="sortOption">Sort</label>
            </div>
            <button type="button" className="btn btn-primary" onClick={handlePrioritySort}>
              Submit
            </button>
          </div>
        </div>

        {/* Combined Results Section */}
        <div className="resultsContainer mt-5 mb-5">
          {renderResults()}
        </div>
      </div>
  );
}

export default App;
