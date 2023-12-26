import { render, fireEvent, waitFor } from "@testing-library/react";
import { PluginCard, PluginCardProps } from "./plugin-card";

describe("PluginCard component", () => {
  const defaultProps: PluginCardProps = {
    pluginName: "Test Plugin",
    pluginDescription: "Description for the test plugin",
    active: false,
    onToggle: jest.fn(() => Promise.resolve()),
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("handles click event and calls onToggle callback", async () => {
    const { getByText } = render(<PluginCard {...defaultProps} />);
    const switcherElement = getByText("Allowed");
    fireEvent.click(switcherElement);

    await waitFor(() => {
      expect(defaultProps.onToggle).toHaveBeenCalled();
      expect(getByText("Blocked")).toBeInTheDocument();
    });
  });

  it("disables click event when disabled prop is true", async () => {
    const { getByText } = render(<PluginCard {...defaultProps} disabled />);
    const switcherElement = getByText("Allowed");

    fireEvent.click(switcherElement);
    await waitFor(() => {
      expect(getByText("Allowed")).toBeInTheDocument();
      expect(defaultProps.onToggle).not.toHaveBeenCalled();
    });
  });

  it("renders PluginCard component with long plugin description", () => {
    const longDescription =
      "This is a very long description to test the rendering of the PluginCard component with a long plugin description.";
    const { getByText } = render(
      <PluginCard {...defaultProps} pluginDescription={longDescription} />
    );
    expect(getByText(longDescription)).toBeInTheDocument();

  });
});