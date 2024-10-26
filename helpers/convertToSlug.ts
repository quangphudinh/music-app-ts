import unidecode from "unidecode";
export const convertToSlug = (str: string) : string => {
    const unidecodeText = unidecode(str.trim())
    const slug : string = unidecodeText.replace(/\s+/g, "-")
    
    return slug
}