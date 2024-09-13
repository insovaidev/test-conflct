export function useMeta(content, backgroundColor, scale) {
   console.log(content)
   useHead({
      style: [
         {
           children: `body { background-color: ${backgroundColor}; touch-action: manipulation}`,
         },
       ],
      meta: [
         {
            name: 'viewport',
            content: content
         },
      ],
   });
 }
 