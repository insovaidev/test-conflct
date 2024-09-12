import { defineStore } from "pinia";

export const useDeviceStore = defineStore("device", () => {
  const initialScale = ref(''); // Store initial scale state
  
  const msg = ref('')

  const { isMobile } = useDevice(); // Composable that detects mobile devices

  // Update the `initialScale` value based on `isMobile`
  watchEffect(() => {
    if (isMobile) {
      msg.value = 'Mobile Check'
      initialScale.value = '1.0';
    } else {
       msg.value = 'Not Mobile Check'
      initialScale.value = '0.0'; // Set a different value for non-mobile devices if needed
    }
  });

  return {
    msg,
    initialScale,
  };
});
