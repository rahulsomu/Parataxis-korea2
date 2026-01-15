import { decode } from "he";

export const isEmpty = (value) => {
    // Check for null or undefined
    if (value == null) return true;
    
    // Check for empty string
    if (typeof value === 'string') return value.trim().length === 0;
    
    // Check for empty array
    if (Array.isArray(value)) return value.length === 0;
    
    // Check for empty object (but not date or other objects)
    if (typeof value === 'object' && !(value instanceof Date)) {
        return Object.keys(value).length === 0;
    }
    
    return false;
};

export const htmlDecoder = (htmlString) => { 
    const decodedHtml = decode(htmlString);
    return decodedHtml;
};

export const isValidJSON = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  }