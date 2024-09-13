import { defineNitroPlugin } from '#app'

export default defineNitroPlugin((nitroApp) => {

  
  nitroApp.hooks.hook('render:html', (html, { event }) => {
    const userAgent = event.req.headers['user-agent'];
    const isMobile = /mobile/i.test(userAgent);

    if (!isMobile) {
      // Desktop: Set viewport and background style
      html.head.push(`
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0">
      `);
      html.head.push(`
        <style>
          body {
            background-color: #f0f0f0; /* Light background for desktop */
          }
        </style>
      `);
    } else {
      // Mobile: Set viewport and background style
      html.head.push(`
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=0.0, maximum-scale=0.0">
      `);
      html.head.push(`
        <style>
          body {
            background-color: #000000; /* Dark background for mobile */
          }
        </style>
      `);
    }
  });
});