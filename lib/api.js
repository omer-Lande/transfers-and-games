import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.football-data.org/',
    headers: {
        'X-Auth-Token': process.env.NEXT_PUBLIC_FOOTBALL_API_KEY || ''
    }
});

export const CACHE_TTL = {
    TRANSFERS: 6 * 60 * 60 * 1000,  // 6 hours
    HISTORY: 24 * 60 * 60 * 1000,   // 24 hours
};

export const fetchAPI = async (endpoint, ttl = CACHE_TTL.TRANSFERS, isMock = false) => {
    const cacheKey = `tiki_${endpoint}`;

    // 1. Check Cache
    if (typeof window !== 'undefined') {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
            try {
                const { data, timestamp } = JSON.parse(cached);
                if (Date.now() - timestamp < ttl) {
                    console.log(`%c[CACHE HIT] Returning cached data for ${endpoint}`, 'color: #10b981; font-weight: bold;');
                    return { data, cached: true };
                } else {
                    console.log(`%c[CACHE EXPIRED] Fetching fresh data for ${endpoint}`, 'color: #f59e0b; font-weight: bold;');
                }
            } catch (e) {
                console.error('Cache parsing error', e);
            }
        }
    }

    // 2. Fetch Fresh Data
    try {
        let data;
        if (isMock) {
            console.log(`%c[API FETCH MOCK] Requesting ${endpoint}`, 'color: #3b82f6; font-weight: bold;');
            // simulate network delay
            await new Promise(r => setTimeout(r, 800));
            data = {
                success: true,
                endpoint,
                mockedAt: new Date().toISOString()
            };
        } else {
            console.log(`%c[API FETCH] Requesting ${endpoint}`, 'color: #3b82f6; font-weight: bold;');
            const response = await api.get(endpoint);
            data = response.data;
        }

        // 3. Save to Cache
        if (typeof window !== 'undefined') {
            localStorage.setItem(cacheKey, JSON.stringify({
                data,
                timestamp: Date.now()
            }));
            console.log(`%c[CACHE SAVED] Data stored for ${endpoint}`, 'color: #8b5cf6; font-weight: bold;');
        }

        return { data, cached: false };
    } catch (error) {
        // 4. Global Error Handling
        if (error.response?.status === 429) {
            console.error("[API ERROR] 429 Too Many Requests");
            return { error: true, type: 'RATE_LIMIT', message: 'You have exceeded the free tier API rate limit.' };
        }
        console.error(`[API ERROR] ${endpoint}:`, error.message);
        return { error: true, type: 'FETCH_ERROR', message: error.message };
    }
};

export const fetchHistoricalMatches = async () => {
    const years = [2024, 2022, 2018];
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const results = [];

    for (const year of years) {
        const targetDate = `${year}-${month}-${day}`;
        // The API endpoint takes dateFrom and dateTo
        const endpoint = `v4/matches?dateFrom=${targetDate}&dateTo=${targetDate}`;

        // Use the existing fetchAPI to benefit from the 24h cache and rate limit handling
        const res = await fetchAPI(endpoint, CACHE_TTL.HISTORY, false);

        if (res.error) {
            results.push({ year, error: res.type, matches: [] });
        } else {
            results.push({ year, matches: res.data?.matches || [] });
        }
    }

    return results;
};
