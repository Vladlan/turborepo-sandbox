import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NavOption } from "./nav-option";

describe("NavOption", () => {
  const defaultProps = {
    active: false,
    tabName: "Test Tab",
    id: "test-tab",
    onClick: jest.fn(),
  };

  it("renders NavOption correctly", () => {
    const { getByText } = render(
      <MemoryRouter>
        <NavOption {...defaultProps}>Test Content</NavOption>
      </MemoryRouter>
    );

    expect(getByText("Test Content")).toBeInTheDocument();
    expect(getByText("Test Tab")).toBeInTheDocument();
  });

  it("applies active styles when active prop is true", () => {
    const { getByText } = render(
      <MemoryRouter>
        <NavOption {...defaultProps} active>
          Test Content
        </NavOption>
      </MemoryRouter>
    );

    const h6 = getByText((content, element) => element?.tagName.toLowerCase() === 'h6');
    expect(h6.parentElement).toHaveClass("bg-white");
    expect(h6.parentElement).toHaveClass("border-l-[5px]");
    expect(h6.parentElement).toHaveClass("border-red-600");
  });

  it("calls onClick prop when clicked", () => {
    const { getByText } = render(
      <MemoryRouter>
        <NavOption {...defaultProps}>Test Content</NavOption>
      </MemoryRouter>
    );

    const navOption = getByText("Test Content").parentElement;
    fireEvent.click(navOption as Element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
});
