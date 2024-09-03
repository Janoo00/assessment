const https = require('https');

// Step 1: taking data from Time.com 
https.get('https://time.com', (res) => {
    let data = '';

    // Step 2: gathering all the data
    res.on('data', (chunk) => {
        data += chunk;
    });

    // Step 3: after data received
    res.on('end', () => {
        const stories = []; // list to keep stories (array)
        let count = 0;
        let searchFrom = 0; // Start index for searching

        // Step 4: 6 finding stories 
        while (count < 6) {
            // 1. first find article tag 
            const articleIndex = data.indexOf('<article', searchFrom);
            if (articleIndex === -1) break; // if not fount then break it

            // 2. then find h3 tag  (for title)
            const titleStart = data.indexOf('<h3>', articleIndex);
            const titleEnd = data.indexOf('</h3>', titleStart);
            if (titleStart === -1 || titleEnd === -1) break;

            // 3. remove and clean uo the title
            const title = data.substring(titleStart + 4, titleEnd).trim();

            // 4. lets find the link
            const linkStart = data.indexOf('href="', articleIndex);
            const linkEnd = data.indexOf('"', linkStart + 6);
            if (linkStart === -1 || linkEnd === -1) break;

            // 5. extract the link and create the complete URL
            const link = 'https://time.com' + data.substring(linkStart + 6, linkEnd);

            // 6. add title and link to story list
            stories.push({ title, link });
            count++;

            // 7. update search position for next article
            searchFrom = articleIndex + 1;
        }

        // Step 5: print the stories
        console.log(stories);
    });
// }).on('error', (e) => {
//     console.error(Error: ${e.message});
});