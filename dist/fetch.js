import getBrowser from './browser.js';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();
async function fetch() {
    const { browser, page } = await getBrowser();
    const Url = process.env.URL;
    if (!Url) {
        throw new Error('URL is not defined');
    }
    await page.goto(Url);
    const element = await page.waitForSelector('table.w-full tbody');
    let polls = new Map();
    if (element) {
        const rows = await page.evaluate(() => {
            const rows = Array.from(document.querySelectorAll('table.w-full tbody tr'));
            return rows.map((row) => {
                const columns = row.querySelectorAll('td');
                return Array.from(columns).map((column) => column.innerText);
            });
        });
        let year = 2024;
        let lastMonth = 0;
        for (const row of rows) {
            const range = row[1].split(' - ');
            const rangeStart = range[0].split('/');
            const rangeEnd = range[1].split('/');
            if (range[0].startsWith('12')) {
                if (lastMonth !== +rangeStart[0]) {
                    year--;
                }
            }
            lastMonth = +rangeStart[0];
            const spreadSplit = row[6].split('\n');
            let starts = new Date(`${year}-${rangeStart[0]}-${rangeStart[1]}`);
            starts.setMinutes(starts.getMinutes() - starts.getTimezoneOffset());
            let ends = new Date(`${year}-${rangeEnd[0]}-${rangeEnd[1]}`);
            ends.setMinutes(ends.getMinutes() - ends.getTimezoneOffset());
            let sampleSplits = row[2].split(' ');
            let sampleNumber = 0;
            let sampleGroup = '';
            if (sampleSplits.length > 1) {
                sampleNumber = +sampleSplits[0];
                sampleGroup = sampleSplits[1];
            }
            else {
                sampleGroup = sampleSplits[0];
            }
            let poll = {
                key: row[0] + starts.toISOString().slice(0, 10),
                pollster: row[0],
                range: row[1],
                starts: starts.toISOString().slice(0, 10),
                ends: ends.toISOString().slice(0, 10),
                sample: row[2],
                sampleNumber: sampleNumber,
                sampleGroup: sampleGroup,
                registeredOnly: sampleGroup === 'RV',
                likelyOnly: sampleGroup === 'LV',
                allPolled: sampleGroup === 'A',
                margin: row[3],
                trump: row[4],
                biden: row[5],
                leading: spreadSplit[0],
                leadingBy: +spreadSplit[1] || 0,
            };
            if (!polls.has(poll.key)) {
                polls.set(poll.key, poll);
            }
        }
    }
    browser.close();
    return [...polls.values()];
}
console.log('Fetching data...');
let polls = await fetch();
let filename = process.argv[2] || 'polls.json';
console.log(`Writing data to ${filename} ...`);
fs.writeFileSync(filename, JSON.stringify(polls, null, 4));
console.log('Done!');
//# sourceMappingURL=fetch.js.map