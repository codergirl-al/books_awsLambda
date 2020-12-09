import React, { useState, useEffect } from "react";
import PublisherDataService from "../services/PublisherService";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

const PublishersList = () => {
  const [publishers, setPublishers] = useState([]);
  const [publisherBooks, setPublisherBooks] = useState([]);
  const [currentPublisher, setCurrentPublisher] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrievePublishers();
  }, []);

  const retrievePublishers = () => {
    PublisherDataService.getAll()
      .then((response) => {
        setPublishers(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrievePublishers();
    setCurrentPublisher(null);
    setCurrentIndex(-1);
  };

  const setActivePublisher = (publisher, index) => {
    PublisherDataService.getBooksByPublisherId(publisher.id).then(
      (response) => {
        publisher.books = response.data;
        console.log(publisher.books);

        setCurrentPublisher(publisher);
        setCurrentIndex(index);
      }
    );
  };

  const columns = [
    { dataField: "id", hidden: true },
    {
      dataField: "name",
      text: "Publisher ^",
      sort: true,
    },
    {
      dataField: "location",
      text: "Location ^",
      sort: true,
    },
  ];

  const tableRowEvents = {
    onClick: (e, row, rowIndex) => {
      console.log(`clicked on row with index: ${row.data}`);
      setActivePublisher(row, rowIndex);
    },
  };

  const { SearchBar } = Search;

  return (
    <div>
      <div className="jumbotron">
        <h2 className="text-info text-center">Our Books' Publishers:</h2>
        <hr />
        <div className="list row">
          <div className="col-md-6">
            <h4>Publishers List</h4>

            <ToolkitProvider
              keyField="id"
              data={publishers}
              columns={columns}
              search
            >
              {(props) => (
                <div>
                  <SearchBar {...props.searchProps} />
                  <hr />
                  <BootstrapTable
                    {...props.baseProps}
                    className="bg-white"
                    keyField="id"
                    rowEvents={tableRowEvents}
                    striped
                    hover
                    condensed
                  />
                </div>
              )}
            </ToolkitProvider>
          </div>
          <div className="col-md-6">
            {currentPublisher ? (
              <div>
                <h4>Publisher</h4>
                <div>
                  <label>
                    <strong>Name:</strong>
                  </label>{" "}
                  {currentPublisher.name}
                </div>
                <div>
                  <label>
                    <strong>Location:</strong>
                  </label>{" "}
                  {currentPublisher.location}
                </div>
                <div>
                  <label>
                    <strong>Books:</strong>
                  </label>{" "}
                  {currentPublisher.books.map((book, index) => (
                    <p>{book.title}</p>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Publisher...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishersList;
