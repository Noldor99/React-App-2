import { Meta, StoryObj } from "@storybook/react"
import { Button } from "@/components/ui/button"
import "../index.css"

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      options: ["black", "black_out", "ghost", "destructive_out"],
      control: {
        type: "inline-radio",
      },
    },
    size: {
      options: ["default", "sm", "lg", "icon"],
      control: {
        type: "inline-radio",
      },
    },
    onClick: { action: "clicked" },
    disabled: {
      control: {
        type: "boolean",
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: "black",
    children: "Button",
  },
}
