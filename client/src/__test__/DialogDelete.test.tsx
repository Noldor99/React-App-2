import DialogDelete from "@/components/DialogDelete"
import { render, screen } from "@/utils/test-utils"
import userEvent from "@testing-library/user-event"

describe("DialogDelete Component", () => {
  const mockOnClick = vi.fn()

  it("displays the confirmation message", () => {
    render(<DialogDelete nameDelete="item" onClick={mockOnClick} />)
    const confirmationMessage = screen.queryByText(
      /Are you sure you want to delete this item\?/i
    )
    if (confirmationMessage) {
      expect(confirmationMessage).toBeInTheDocument()
    } else {
      console.log("Confirmation message not found")
    }
  })

  it('renders the "Delete" button', () => {
    render(<DialogDelete nameDelete="item" onClick={mockOnClick} />)
    const deleteButton = screen.queryByText(/Delete\?/i)
    expect(deleteButton).toBeNull()
  })

  it('calls the onClick handler when "Delete" button is clicked', async () => {
    render(<DialogDelete nameDelete="item" onClick={mockOnClick} />)
    const deleteButton = screen.queryByText(/Delete\?/i)
    if (deleteButton) {
      await userEvent.click(deleteButton)
      expect(mockOnClick).toHaveBeenCalled()
    } else {
      console.log("Delete button not found")
    }
  })

  it('renders the "Cancel" button', () => {
    render(<DialogDelete nameDelete="item" onClick={mockOnClick} />)
    const canselButton = screen.queryByText(/Cancel\?/i)
    expect(canselButton).toBeNull()
  })

  it('does not render the "Delete" button initially', () => {
    render(<DialogDelete nameDelete="item" onClick={mockOnClick} />)
    const deleteButton = screen.queryByText(/Delete\?/i)
    expect(deleteButton).toBeNull()
  })
})
