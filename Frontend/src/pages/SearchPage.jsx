import React from "react";
import { useState } from "react";
import { Box, Input, Button, Text, Heading } from "@chakra-ui/react";
import api from "../services/api";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await api.get(`/documents/search?q=${query}`);
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box p={8}>
      <Heading mb={4}>Search Documents</Heading>
      <Input
        placeholder="Enter keyword..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button mt={2} onClick={handleSearch} colorScheme="teal">
        Search
      </Button>
      {results.map((doc) => (
        <Box key={doc._id} p={4} borderWidth="1px" mt={2}>
          <Text fontWeight="bold">{doc.title}</Text>
          <Text>{doc.content}</Text>
        </Box>
      ))}
    </Box>
  );
}

export default SearchPage;
