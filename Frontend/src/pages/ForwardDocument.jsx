import React, { useState, useEffect } from "react";
import {
  Box, Heading, Checkbox, Button, useToast
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function ForwardDocument() {
  const { id } = useParams(); 
  const toast = useToast();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await api.get("/users/all");
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const toggleUser = (userId) => {
    setSelected(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleForward = async () => {
    try {
      await api.patch(`/documents/forward/${id}`, { sharedWith: selected });
      toast({
        title: "Document Shared",
        description: "Selected users have access now.",
        status: "success",
      });
      navigate("/mydocuments");
    } catch (err) {
      toast({
        title: "Error",
        description: err.response?.data || "Something went wrong",
        status: "error",
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="8">
      <Heading mb="4">Forward Document</Heading>
      {users.map(user => (
        <Checkbox
          key={user._id}
          isChecked={selected.includes(user._id)}
          onChange={() => toggleUser(user._id)}
        >
          {user.name} ({user.email})
        </Checkbox>
      ))}

      <Button mt="4" colorScheme="teal" onClick={handleForward} isDisabled={!selected.length}>
        Forward
      </Button>
    </Box>
  );
}

export default ForwardDocument;
