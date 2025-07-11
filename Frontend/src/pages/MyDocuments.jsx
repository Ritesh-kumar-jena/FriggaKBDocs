import React from "react";
import { useEffect, useState } from "react";
import api from "../services/api";
import { Box, Heading, Text } from "@chakra-ui/react";

function MyDocuments() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await api.get("/documents");
        setDocs(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDocs();
  }, []);

  return (
    <Box p={8}>
      <Heading mb={4}>My Documents</Heading>
      {docs.map((doc) => (
        <Box key={doc._id} p={4} borderWidth="1px" mb={2}>
          <Text fontWeight="bold">{doc.title}</Text>
          <Text>{doc.content}</Text>
          <Text fontSize="sm">Visibility: {doc.visibility}</Text>
        </Box>
      ))}
    </Box>
  );
}

export default MyDocuments;
