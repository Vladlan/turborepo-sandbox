import { render, fireEvent, waitFor } from "@testing-library/react";
import { Switcher, SwitcherProps } from "./switcher";

describe("Switcher component", () => {
  const defaultProps: SwitcherProps = {
    active: false,
    withStatusDescription: true,
  };

  it("handles click event and toggles state", () => {
    const { getByText } = render(<Switcher {...defaultProps} />);
    const switcherElement = getByText("Blocked");

    fireEvent.click(switcherElement);
    expect(switcherElement.textContent).toBe("Allowed");
    
    fireEvent.click(switcherElement);
    expect(switcherElement.textContent).toBe("Blocked");
  });

  it("handles click event and calls onToggle callback", async () => {
    const onToggleMock = jest.fn(() => Promise.resolve());
    const { getByText } = render(
      <Switcher {...defaultProps} onToggle={onToggleMock} />
    );
    const switcherElement = getByText("Blocked");

    fireEvent.click(switcherElement);

    await waitFor(() => {
      expect(onToggleMock).toHaveBeenCalled();
      expect(switcherElement.textContent).toBe("Allowed");
    });
  });

  it("disables click event when disabled prop is true", () => {
    const onToggleMock = jest.fn();
    const { getByText } = render(
      <Switcher {...defaultProps} disabled onToggle={onToggleMock} />
    );
    const switcherElement = getByText("Blocked");

    fireEvent.click(switcherElement);

    expect(onToggleMock).not.toHaveBeenCalled();
    expect(switcherElement.textContent).toBe("Blocked");
  });
});