import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { Meta, StoryFn } from "@storybook/react"

export default {
  title: "Components/Toast",
  component: Toast,
  argTypes: {
    variant: {
      control: {
        type: "radio",
        options: ["default", "destructive"],
      },
    },
  },
} as Meta

type ToastProps = {
  title: string
  description: string
  variant?: "default" | "destructive"
}

const Template: StoryFn<ToastProps> = (args) => (
  <ToastProvider>
    <ToastViewport>
      <Toast {...args}>
        <ToastTitle>{args.title}</ToastTitle>
        <ToastDescription>{args.description}</ToastDescription>
        <ToastClose />
      </Toast>
    </ToastViewport>
  </ToastProvider>
)

export const Default = Template.bind({})
Default.args = {
  title: "Success",
  description: "Create success",
  variant: "default",
}

export const Destructive = Template.bind({})
Destructive.args = {
  title: "Destructive Toast",
  description: "This is a destructive toast message.",
  variant: "destructive",
}
