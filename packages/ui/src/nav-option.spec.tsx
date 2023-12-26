import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NavOption, NavOptionProps } from "./nav-option";

describe("NavOption", () => {
  const defaultProps: NavOptionProps = {
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
    expect(getByText(defaultProps.tabName)).toBeInTheDocument();
  });

  it("applies active styles when active prop is true", () => {
    const { getByRole } = render(
      <MemoryRouter>
        <NavOption {...defaultProps} active>
          Test Content
        </NavOption>
      </MemoryRouter>
    );

    const h6 = getByRole('heading');
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
