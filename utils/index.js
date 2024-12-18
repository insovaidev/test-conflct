export function forMatDate(originalDateString, lang = 'en') {
  // Parse the original date string
  const originalDate = new Date(originalDateString);

  // Extract day, month, and year
  const day = originalDate.getDate();
  const month = originalDate.getMonth(); 
  const year = originalDate.getFullYear();

  // Arrays of month names in both English and Khmer
  const enMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const khmerMonthNames = ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"];

  // Choose the appropriate month names array based on the language parameter
  const monthNames = lang === 'km' ? khmerMonthNames : enMonthNames;

  // Format the date into the desired format
  return `${day < 10 ? '0'+day : day}, ${monthNames[month]} ${year}`;
}

/** 
 * The result of formatDateWithTimeAgo:
 * - If the time difference from now is greater than or equal to 24 hours, it returns the formatted date, e.g., "18 Jun 2024".
 * - If the time difference from now is between 1 hour and 24 hours, it returns the number of hours ago, e.g., "1 hour ago".
 * - If the time difference from now is between 1 minute and 59 minutes, it returns the number of minutes ago, e.g., "1 minute ago".
 * - If the time difference from now is less than or equal to 59 seconds, it returns "Just now".
 */

export function formatDateWithTimeAgoest(date) {

  const givenDate = new Date(date);
  const seconds = Math.floor((new Date() - givenDate) / 1000);


  if (seconds >= 31536000) {
      return forMatDate(givenDate);
  }

  if (seconds >= 604800) { // in weeks
      return forMatDate(givenDate);
  }

  if (seconds >= 86400) { // in days
      return forMatDate(givenDate);
  }

  if (seconds >= 3600) { // in hours
      const hours = Math.floor(seconds / 3600);
      return hours + (hours > 1 ? ' hours ago' : ' hour ago');
  }

  if (seconds >= 60) { // in minutes
      const minutes = Math.floor(seconds / 60);
      return minutes + (minutes > 1 ? ' minutes ago' : ' minute ago');
  }

  return 'Just now';
}


export function formatDateWithTimeAgo(date, lang = 'en') {
  const givenDate = new Date(date);
  const seconds = Math.floor((new Date() - givenDate) / 1000);

  // Function to handle translation of "ago" phrases
  const translateTimeAgo = (value, unit) => {
    if (lang === 'km') {
      switch (unit) {
        case 'hour': return `${value} ម៉ោងមុន`;
        case 'minute': return `${value} នាទីមុន`;
        case 'justNow': return 'ឥឡូវនេះ';
      }
    } else {
      // Default to English
      if (unit === 'justNow') return 'Just now';
      return `${value} ${unit}${value > 1 ? 's' : ''} ago`;
    }
  };

  if (seconds >= 31536000 || seconds >= 604800 || seconds >= 86400) { 
      // Use forMatDate function to format the date for large intervals
      return forMatDate(givenDate, lang);
  }

  if (seconds >= 3600) { // in hours
      const hours = Math.floor(seconds / 3600);
      return translateTimeAgo(hours, 'hour');
  }

  if (seconds >= 60) { // in minutes
      const minutes = Math.floor(seconds / 60);
      return translateTimeAgo(minutes, 'minute');
  }

  return translateTimeAgo(null, 'justNow');
}


export function formatAmount(number) {
    const formatter = new Intl.NumberFormat('en-US', {
     minimumFractionDigits: 0, 
     maximumFractionDigits: 2
    });
    return formatter.format(number);
}

export function formatDateGraph(string) {
    const date = new Date(string)
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' }); 
    return `${day} ${month}`;
}

export function graphData(insight) {
    const data = []
    const seriesObject = {
      'impression' :{
        name: 'impression',
        data: [],
        type: 'bar',
        stack: 'a',
        itemStyle: {
            borderRadius: [50, 50, 0, 0] 
        },
        barWidth: 15,
        color: "#072BE0"
      },
      'view': {
        name: 'view',
        data: [],
        type: 'bar',
        stack: 'b',
        itemStyle: {
            borderRadius: [50, 50, 0, 0] 
        },
        barWidth: 15,
        color: "#438afe"
      },
      'contact' :{
        name: 'contact',
        data: [],
        type: 'bar',
        stack: 'c',
        itemStyle: {
            borderRadius: [50, 50, 0, 0] 
        },
        barWidth: 15,
        color: "#f75583"
      },
      'chat' :{
        name: 'chat',
        data: [],
        type: 'bar',
        stack: 'd',
        itemStyle: {
            borderRadius: [50, 50, 0, 0] 
        },
        barWidth: 15,
        color: "#ff9700"
      },
    }
    insight.forEach(val => {
      data.push(formatDateGraph(val.created_date))
      seriesObject['impression'].data.push(val.data.impression) 
      seriesObject['view'].data.push(val.data.view) 
      seriesObject['contact'].data.push(val.data.contact) 
      seriesObject['chat'].data.push(val.data.chat) 
    });
    return { data , 'series': seriesObject } ;
}

export function clearLocalStorage(keys=[]) {
  if(keys && keys.length) {
    keys.forEach((val) => {
      localStorage.removeItem(val)
    })
  }
  return
}

export function clearState(keys = []) {
  if (keys && keys.length) {
    keys.forEach((key) => {
      const stateVal = useState(key);
      stateVal.value = '';
    });
  }
}

/**
 * This function helps determine whether to show the header based on device type and window width.
 * It returns a reactive computed property `shouldShowHeader` that is true if the device is not a desktop
 * or the window width is less than 768px.
 */
export function checkMobileDevice() {
  const { isMobile  } = useDevice();
  const windowWidth = ref(window.innerWidth);

  const updateWindowWidth = () => {
      windowWidth.value = window.innerWidth;
  };

  onMounted(() => {
      window.addEventListener('resize', updateWindowWidth);
  });

  onBeforeUnmount(() => {
      window.removeEventListener('resize', updateWindowWidth);
  });
  // if (isMobile || windowWidth.value < 768 ) {
  if (isMobile) {
    return true 
  } else {
    return false
  }   
}

export function getHeighHeader() {
  const header = document.getElementById('header-dynamic');
  if(!header) return 0
  const headerHeight = header.offsetHeight;
  return headerHeight+10
}

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const shareUrl = async (title='', text='', url='') => {

  const shareData = {
    title: title,
    // text: text,
    url: url,
  }
  try {
    if (navigator.canShare) {
      const supported = {};
      // Check for each property individually
      if (navigator.canShare({ title: shareData.title })) {
        supported.title = true;
      }

      if (navigator.canShare({ text: shareData.text })) {
        supported.text = true;
      }

      if (navigator.canShare({ url: shareData.url })) {
        supported.url = true;
      }
      
      // Share only if supported properties are present
      if (Object.keys(supported).length > 0) {

        navigator.share(shareData).then(() => {
          // console.log('Data shared successfully!');
        }).catch((error) => {
          // console.error('Error sharing:', error);
        });

      } else {
        console.log('No supported share properties.');
        return
      }
    }
  } catch (error) {
    console.log('Error:', error)
  }
} 

export const shareLinkToFacebook = (uri) => {
  try {
    if (window.navigator.onLine) {
      window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(''+uri+''),'facebook-share-dialog','width=626,height=436');
      return false;
  } else {
      return $('#modal_show_status_error_connection').modal('show');
  }
  } catch (error) {
    console.log('Error:', error)
  }
} 

export const shareToX = (uri) => {
  try {
    if (window.navigator.onLine) {
      window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent(''+uri+''),'facebook-share-dialog','width=626,height=436');
      return false;
    } else {
      return $('#modal_show_statu_error_connection').modal('show');
    }
  } catch (error) {
    console.log('Error:', error)
  }
} 

export const checkUserAgent = () => {
  let check = false;
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  const userAgent = navigator.userAgent;

  toMatch.map((ele) => {
    if (userAgent.match(ele)) {
      check = true;
    }
  })
  return check;
};





