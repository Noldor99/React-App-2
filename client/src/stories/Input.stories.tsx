import { Meta, StoryFn } from "@storybook/react"

import "../index.css"
import { Input, InputProps } from "@/components/ui/input"

export default {
  title: "Components/Input",
  component: Input,
} as Meta

const Template: StoryFn<InputProps> = (args) => <Input {...args} />

export const Default = Template.bind({})
Default.args = {
  placeholder: "Enter text here",
}

export const PasswordInput = Template.bind({})
PasswordInput.args = {
  type: "password",
  placeholder: "Enter your password",
}

export const DisabledInput = Template.bind({})
DisabledInput.args = {
  placeholder: "Disabled input",
  disabled: true,
}

export const ErrorInput = Template.bind({})
ErrorInput.args = {
  placeholder: "Error input",
  className: "border-red-500",
}
