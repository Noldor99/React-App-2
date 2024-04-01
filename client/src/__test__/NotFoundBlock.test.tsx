import NotFoundBlock from "@/components/NotFoundBlock"
import { render, screen } from "@/utils/test-utils"

describe("NotFoundBlock Component", () => {
  it('displays the message "This page is not available"', () => {
    render(<NotFoundBlock />)
    expect(screen.getByText(/This page is not available/i)).toBeInTheDocument()
  })

  it("has correct styling for the message", () => {
    render(<NotFoundBlock />)
    const messageElement = screen.getByText(/This page is not available/i)
    expect(messageElement).toHaveClass("pt-[40px] text-center")
  })
})
