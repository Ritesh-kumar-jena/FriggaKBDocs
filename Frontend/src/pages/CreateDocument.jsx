import React from "react";
import { useState } from "react";
import { Box, Input, Button, FormLabel, Select, Textarea, useToast } from "@chakra-ui/react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function CreateDocument() {
  const [form, setForm] = useState({ title: "", content: "", visibility: "private" });
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({...form, [name]: value});
  };

  const handleCreate = async () => {
    try {
      await api.post("/documents/create", form);
      toast({
        title: "Document Created",
        status: "success",
        duration: 3000,
        isClosable: true
      });
      navigate("/mydocuments");
    } catch (err) {
      toast({
        title: "Failed",
        description: err.response?.data || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="50px" p="6" borderWidth="1px" borderRadius="lg">
      <FormLabel>Title</FormLabel>
      <Input name="title" onChange={handleChange} />
      <FormLabel>Content</FormLabel>
      <Textarea name="content" onChange={handleChange} />
      <FormLabel>Visibility</FormLabel>
      <Select name="visibility" value={form.visibility} onChange={handleChange}>
        <option value="private">Private</option>
        <option value="public">Public</option>
      </Select>
      <Button mt="4" colorScheme="teal" onClick={handleCreate}>Create</Button>
    </Box>
  );
}

export default CreateDocument;
