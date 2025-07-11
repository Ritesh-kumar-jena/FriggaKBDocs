import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Spinner,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import api from "../services/api";

function HomePage() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicDocs = async () => {
      try {
        const res = await api.get("/documents/public");
        setDocs(res.data);
      } catch (error) {
        console.error("Error fetching public documents:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPublicDocs();
  }, []);

  return (
    <Box maxW="6xl" mx="auto" mt={8} p={4}>
      <Heading mb={6}>Public Documents</Heading>

      {loading ? (
        <Spinner size="xl" />
      ) : docs.length === 0 ? (
        <Text>No public documents found.</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {docs.map((doc) => (
            <Card key={doc._id} borderWidth="1px" borderRadius="lg" p={4}>
              <CardHeader>
                <Heading size="md">{doc.title}</Heading>
                <Text fontSize="sm" color="gray.500">
                  by {doc.author?.name} ({doc.author?.email})
                </Text>
              </CardHeader>
              <CardBody>
                <Text>{doc.content.slice(0, 100)}...</Text>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}

export default HomePage;
