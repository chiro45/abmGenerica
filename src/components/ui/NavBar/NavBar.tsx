import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const pages = [
  { title: "Persona", route: "/" },
  { title: "Producto", route: "/producto" },
];

export const NavBar = () => {
  const navigate = useNavigate();

  const handleNavigate = (route: string) => {
    navigate(route);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={() => {
                  handleNavigate(page.route);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
