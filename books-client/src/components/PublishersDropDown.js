// import React, { useState, useEffect } from "react";
// import PublisherDataService from "../services/PublisherService";
// import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

// export const getPublishersDropdown = () => {
//   useEffect(() => {
//     retrievePublishers();
//   }, []);

//   const retrievePublishers = () => {
//     PublisherDataService.getAll()
//       .then((response) => {
//           response.map((item) => {
//         setPublishers(response.data);
//         console.log(response.data);
//       })
//       .catch((e) => {
//         console.log(e);
//       })
//     }
//   };

// };
