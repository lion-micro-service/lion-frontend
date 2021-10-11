let authority = function authority(authorityCode:string):any{
    if (!authorityCode || authorityCode === ''){
        return false;
    }
    const authorityStr = sessionStorage.getItem("authority");
    if (authorityStr && authorityStr!== '') {
        const authority: Array<string> = authorityStr.split(',');
        if (authority.includes(authorityCode)) {
            return true;
        }
    }
    return false
}
export default authority;