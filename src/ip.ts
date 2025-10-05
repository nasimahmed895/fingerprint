export async function getIP(apiKey?: string) {
    if (typeof fetch === "undefined") return null;
    // Use conditional to handle `apiKey` correctly
    const key = apiKey ? `&key=${apiKey}` : '';
    try {
        const res = await fetch("https://api64.ipify.org?format=json");
        const data = await res.json();
        // return data.ip;
        const returnData = `?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query`
        const url = process.env.NODE_ENV === "development" ? `http://ip-api.com/json/${data.ip}${returnData}${key}` : `https://ip-api.com/json/${data.ip}${returnData}${key}`;
        const resIPInformation = await fetch(url);
        const dataIPInformation = await resIPInformation.json();
        console.log(dataIPInformation)
        if (dataIPInformation.status === 'success') {
            delete dataIPInformation.query
            return { ...dataIPInformation, ip: data.ip };
        } else {
            return { ...data, status: 'success', }
        }
    } catch {
        return {
            status: 'fail',
            message: 'unavailable to service'
        };
    }
}