import { render, screen } from "@testing-library/react";
import { OutputPanel } from "@/components/OutputPanel";

test("renders status text", () => {
    // Tests that the status message is always displayed in the output panel
    render(<OutputPanel results={null} loading={true} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

test("renders number of contacts when results exist", () => {
    // Tests that the correct number of contacts is shown when results are available
    const mockResults = {
        time: 1.23,
        data: {
            contacts: [{ name: "John" }, { name: "Jane" }],
        },
    };

    render(<OutputPanel results={mockResults as any} loading={false} />);

    expect(screen.getByText(/Found 2 contacts/i)).toBeInTheDocument();
});

test("renders contact fields correctly", () => {
    // Tests that contact fields are rendered as key-value pairs
    const mockResults = {
        time: 0.5,
        data: {
            contacts: [{ name: "John", email: "john@test.com" }],
        },
    };

    render(<OutputPanel results={mockResults as any} loading={false} />);

    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
});