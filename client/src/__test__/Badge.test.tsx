import { Badge } from "@/components/ui/badge"
import { render, screen } from "@/utils/test-utils"

describe("Badge Component", () => {
  it("renders with default variant", () => {
    render(<Badge data-testid="badge" />)
    const badge = screen.getByTestId("badge")
    expect(badge).toHaveClass(
      "bg-white text-black hover:border-muted-foreground"
    )
  })

  it("renders with 'muted' variant", () => {
    render(<Badge variant="muted" data-testid="badge" />)
    const badge = screen.getByTestId("badge")
    expect(badge).toHaveClass(
      "rounded-[8px] bg-muted text-black hover:bg-black hover:text-white"
    )
  })

  it("renders with 'primary' variant", () => {
    render(<Badge variant="primary" data-testid="badge" />)
    const badge = screen.getByTestId("badge")
    expect(badge).toHaveClass("bg-primary text-white hover:bg-muted")
  })
})
