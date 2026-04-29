import { render, screen, fireEvent } from "@testing-library/react";
import { InputPanel } from "@/components/InputPanel";

// Tests that the InputPanel correctly renders all section labels and the Search button
test("renders InputPanel fields", () => {
    render(<InputPanel search={vi.fn()} />);

    expect(screen.getByText("1. Target websites")).toBeInTheDocument();
    expect(screen.getByText("2. Occupation / Role")).toBeInTheDocument();
    expect(screen.getByText("3. Data Points to Extract")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
});

// Tests that the search function is called when the user enters values and clicks Search
test("calls search with correct input values", () => {
    const mockSearch = vi.fn();

    render(<InputPanel search={mockSearch} />);

    fireEvent.change(screen.getByPlaceholderText("https://www.example.com"), {
        target: { value: "https://test.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter occupation or role"), {
        target: { value: "developer" },
    });

    fireEvent.click(screen.getByText("Search"));

    expect(mockSearch).toHaveBeenCalled();
});

// Tests that a user can add a new data field and it appears in the UI
test("adds new data field", () => {
    render(<InputPanel search={vi.fn()} />);

    fireEvent.change(screen.getByPlaceholderText("Enter data point"), {
        target: { value: "email" },
    });

    fireEvent.click(screen.getByText("Add"));

    expect(screen.getByText("email")).toBeInTheDocument();
});

// Tests that an added data field can be removed from the UI using the delete button
test("removes data field", () => {
    render(<InputPanel search={vi.fn()} />);

    fireEvent.change(screen.getByPlaceholderText("Enter data point"), {
        target: { value: "email" },
    });

    fireEvent.click(screen.getByText("Add"));

    expect(screen.getByText("email")).toBeInTheDocument();

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[1]);

    expect(screen.queryByText("email")).not.toBeInTheDocument();
});

// Tests that the occupations input is correctly split into an array using commas before calling search
test("splits occupations correctly", () => {
    const mockSearch = vi.fn();
  
    render(<InputPanel search={mockSearch} />);
  
    fireEvent.change(screen.getByPlaceholderText("Enter occupation or role"), {
      target: { value: "dev, designer" },
    });
  
    fireEvent.click(screen.getByText("Search"));
  
    expect(mockSearch).toHaveBeenCalledWith(
      expect.objectContaining({
        occupations: ["dev", "designer"],
      })
    );
  });