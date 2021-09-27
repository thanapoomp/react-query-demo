export const encodeURLWithParams = (url,paramObject) => 
{
   return url + '?' + Object.entries(paramObject).map(kv => kv.map(encodeURIComponent).join("=")).join("&");
}

export const toAbsoluteUrl = pathname => process.env.PUBLIC_URL + pathname;