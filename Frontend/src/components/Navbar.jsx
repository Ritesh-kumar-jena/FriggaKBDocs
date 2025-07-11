import React, { useContext } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  HStack,
  Button,
  Link,
  Spacer,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { DarkMode } from "./DarkMode";
import { AuthContext } from "../context/AuthContextProvider";
import { jwtDecode } from "jwt-decode";

function Navbar() {
  const { isLogin, setIsLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const bg = useColorModeValue("gray.100", "gray.900");

  let userName = "";

  if (isLogin) {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        userName = decoded.name || "";
      }
    } catch (err) {
      console.error("Failed to decode token:", err);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    navigate("/login");
  };

  return (
    <Box bg={bg} px={4} py={2} boxShadow="sm">
      <Flex alignItems="center">
        <HStack spacing={4}>
          <Link as={RouterLink} to="/" fontWeight="bold">
            FriggaKBDocs
          </Link>
          {isLogin && (
            <>
              <Link as={RouterLink} to="/mydocuments">
                My Documents
              </Link>
              <Link as={RouterLink} to="/createdocument">
                Create
              </Link>
              <Link as={RouterLink} to="/searchpage">
                Search
              </Link>
              <Link as={RouterLink} to="/profilepage">
                Profile
              </Link>
            </>
          )}
        </HStack>

        <Spacer />

        <HStack spacing={4}>
          {isLogin && (
            <Text fontWeight="medium" color="gray.600">
              👋 Hi, {userName}
            </Text>
          )}
          <DarkMode />
          {isLogin ? (
            <Button colorScheme="teal" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button
                colorScheme="teal"
                size="sm"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                variant="outline"
                colorScheme="teal"
                size="sm"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </>
          )}
        </HStack>
      </Flex>
    </Box>
  );
}

export default Navbar;
