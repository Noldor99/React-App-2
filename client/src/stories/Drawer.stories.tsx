import { Meta, StoryFn } from "@storybook/react"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

export default {
  title: "Components/Drawer",
  component: Drawer,
} as Meta

const Template: StoryFn = (args) => (
  <Drawer {...args}>
    <DrawerTrigger asChild>
      <Button variant="black_out">History</Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Drawer Title</DrawerTitle>
        <DrawerDescription>Description of the drawer.</DrawerDescription>
      </DrawerHeader>
      <p>Drawer content goes here.</p>
    </DrawerContent>
  </Drawer>
)

export const Example = Template.bind({})
Example.args = {
  shouldScaleBackground: true,
}
