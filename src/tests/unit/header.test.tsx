import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "@/components/Header";


// This test verifies that the Header component correctly renders all expected UI elements
test("renders Header logo and links", () => {
  render(<Header />);
  expect(screen.getByText("Contact Search")).toBeInTheDocument();
  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("Databases")).toBeInTheDocument();
  expect(screen.getByText("Log in")).toBeInTheDocument();
  expect(screen.getByText("Register")).toBeInTheDocument();
});

// This test verifies that clicking the Header buttons updates window.location.href to the correct routes
test("buttons change window.location.href", () => {
  const mockLocation = { href: "" };

  Object.defineProperty(window, "location", {
    value: mockLocation,
    writable: true,
  });

  render(<Header />);

  fireEvent.click(screen.getByText("Log in"));
  expect(mockLocation.href).toBe("/login");

  fireEvent.click(screen.getByText("Register"));
  expect(mockLocation.href).toBe("/coming_soon");
});
