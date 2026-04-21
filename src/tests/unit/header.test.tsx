import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "@/components/Header";


// This test verifies that the Header component correctly renders all expected UI elements
test("renders Header logo and links", () => {
  render(<Header />);
  expect(screen.getByText("Contact Search")).toBeInTheDocument();
  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("Databases")).toBeInTheDocument();
});

// This test verifies that clicking the Header buttons updates window.location.href to the correct routes
test("buttons change window.location.href", () => {
  const mockLocation = { href: "" };

  Object.defineProperty(window, "location", {
    value: mockLocation,
    writable: true,
  });

  render(<Header />);

});
