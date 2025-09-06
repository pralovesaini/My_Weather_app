import { Stack } from "expo-router";

export default function RootLayout({ children }) {
  return (
   <Stack screenOptions={
    {headerShown:false}
   }/>
  )
}