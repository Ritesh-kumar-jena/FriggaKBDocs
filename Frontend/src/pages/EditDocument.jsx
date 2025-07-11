import React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Input,
  FormLabel,
  Select,
  Textarea,
  Button,
  useToast
} from "@chakra-ui/react";
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

function EditDocument() {
  const { id } = useParams(); 
  const [form, setForm] = useState({
    title: "",
    content: "",
    visibility: "private"
  });
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const res = await api.get("/documents");
        const doc = res.data.find((d) => d._id === id);
        if (doc) {
          setForm({
            title: doc.title,
            content: doc.content,
            visibility: doc.visibility
          });
        } else {
          toast({
            title: "Document not found",
            status: "error",
            duration: 3000,
            isClosable: true
          });
          navigate("/mydocuments");
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchDoc();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await api.patch(`/documents/edit/${id}`, form);
      toast({
        title: "Document Updated",
        status: "success",
        duration: 3000,
        isClosable: true
      });
      navigate("/mydocuments");
    } catch (err) {
      toast({
        title: "Failed to update",
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
      <Input name="title" value={form.title} onChange={handleChange} />
      <FormLabel>Content</FormLabel>
      <Textarea name="content" value={form.content} onChange={handleChange} />
      <FormLabel>Visibility</FormLabel>
      <Select
        name="visibility"
        value={form.visibility}
        onChange={handleChange}
      >
        <option value="private">Private</option>
        <option value="public">Public</option>
      </Select>
      <Button mt="4" colorScheme="teal" onClick={handleUpdate}>
        Update
      </Button>
    </Box>
  );
}

export default EditDocument;
