// const https = require("https")

// const options={
//     hostname : 'time.com',
//     path: '/',
//     method: 'GET',
// }

// const req = https.request(options,(res)=>{
//     let data = '';
//     res.on('data',(chunk)=>{data += chunk;})
//     res.on('end',()=>{
//         const stories =[]
//         const regex = /<article[\s\S]*?<h3>([s\S]*?)</h3> 
        

//     })
// })
const https = require('https');

// Step 1: Time.com se data mangna
https.get('https://time.com', (res) => {
    let data = '';

    // Step 2: Saara data ikattha karna
    res.on('data', (chunk) => {
        data += chunk;
    });

    // Step 3: Data milne ke baad
    res.on('end', () => {
        const stories = []; // Stories ko rakhne ke liye list (array)
        let count = 0;
        let searchFrom = 0; // Start index for searching

        // Step 4: 6 stories dhoondhna
        while (count < 6) {
            // 1. Pehle article tag dhoondho
            const articleIndex = data.indexOf('<article', searchFrom);
            if (articleIndex === -1) break; // Agar nahi milta, break kar do

            // 2. Fir h3 tag dhoondho (title ke liye)
            const titleStart = data.indexOf('<h3>', articleIndex);
            const titleEnd = data.indexOf('</h3>', titleStart);
            if (titleStart === -1 || titleEnd === -1) break;

            // 3. Title ko nikaalo aur clean karo
            const title = data.substring(titleStart + 4, titleEnd).trim();

            // 4. Ab link dhoondho
            const linkStart = data.indexOf('href="', articleIndex);
            const linkEnd = data.indexOf('"', linkStart + 6);
            if (linkStart === -1 || linkEnd === -1) break;

            // 5. Link ko nikaalo aur complete URL banao
            const link = 'https://time.com' + data.substring(linkStart + 6, linkEnd);

            // 6. Title aur link ko stories list mein add karo
            stories.push({ title, link });
            count++;

            // 7. Next article ke liye search position ko update karo
            searchFrom = articleIndex + 1;
        }

        // Step 5: Stories ko print karo
        console.log(stories);
    });
// }).on('error', (e) => {
//     console.error(Error: ${e.message});
});