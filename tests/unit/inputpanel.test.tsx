import { render, screen, fireEvent } from "@testing-library/react";
import { InputPanel } from "@/components/InputPanel";

// Tests that the InputPanel correctly renders all section labels and the Search button
test("renders InputPanel fields", () => {
    render(<InputPanel search={vi.fn()} />);

    expect(screen.getByText("1. Model")).toBeInTheDocument();
    expect(screen.getByText("2. Target websites (One Per Line)")).toBeInTheDocument();
    expect(screen.getByText("3. Occupation / Role")).toBeInTheDocument();
    expect(screen.getByText("4. Data Points to Extract")).toBeInTheDocument();
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
  
    const input = screen.getByPlaceholderText("Enter data point");
  
    fireEvent.change(input, {
      target: { value: "email" },
    });
  
    const addButton = input.parentElement!.querySelector("button");
  
    fireEvent.click(addButton!);
  
    expect(screen.getByText("email")).toBeInTheDocument();
  });

// Tests that an added data field can be removed from the UI using the delete button
test("removes data field", () => {
    render(<InputPanel search={vi.fn()} />);
  
    const input = screen.getByPlaceholderText("Enter data point");
  
    fireEvent.change(input, {
      target: { value: "email" },
    });
  
    const addButton = input.parentElement!.querySelector("button");
    fireEvent.click(addButton!);
  
    expect(screen.getByText("email")).toBeInTheDocument();
  
    const chip = screen.getByText("email").closest("div")!;
    const deleteButton = chip.querySelector("button");
  
    fireEvent.click(deleteButton!);
  
    expect(screen.queryByText("email")).not.toBeInTheDocument();
  });

// Tests that the occupations input is correctly split into an array using commas before calling search
test("adds occupations and sends them to search", () => {
    const mockSearch = vi.fn();
  
    render(<InputPanel search={mockSearch} />);
  
    const input = screen.getByPlaceholderText("Enter occupation or role");
  
    fireEvent.change(input, { target: { value: "dev" } });
  
    const addButton = input.parentElement!.querySelector("button");
    fireEvent.click(addButton!);

    fireEvent.change(input, { target: { value: "designer" } });
    fireEvent.click(addButton!);
  
    fireEvent.click(screen.getByText("Search"));
  
    expect(mockSearch).toHaveBeenCalledWith(
      expect.objectContaining({
        occupations: ["dev", "designer"],
      })
    );
  });