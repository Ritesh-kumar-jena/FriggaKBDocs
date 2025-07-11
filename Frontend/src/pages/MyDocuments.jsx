import React from "react";
import { useEffect, useState } from "react";
import api from "../services/api";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function MyDocuments() {
  const [docs, setDocs] = useState([]);
const navigate=useNavigate()
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
        <Box key={doc._id} p={4} borderWidth="1px" mb={2} boxShadow="sm" _hover={{ boxShadow: "lg" }}>
          <Text fontWeight="bold">{doc.title}</Text>
          <Text>{doc.content}</Text>
          <Text fontSize="sm">Visibility: {doc.visibility}</Text>
           <Button size="sm" colorScheme="yellow" mr={2} onClick={() => navigate(`/editdocument/${doc._id}`)}>Edit</Button>
          <Button size="sm" colorScheme="blue" onClick={() => navigate(`/forward/${doc._id}`)}>Forward</Button>
        </Box>
      ))}
    </Box>
  );
}

export default MyDocuments;
