import { Stack } from "expo-router";

export default function WorkoutLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/*Default screen (first shown when user taps Workout tab)*/}
      <Stack.Screen name="workoutIndex" />

      {/*Internal routes*/}
      <Stack.Screen name="ai_chat" />
      <Stack.Screen name="dashboard" />
    </Stack>
  );
}