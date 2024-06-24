//service to crop image since API brings back a raw full sized image, this will help with performance.

export const getCroppedImageUrl = (url: string) => {
    const target = 'media/'
    const index = url.indexOf(target) + target.length;
    return url.slice(0,index) + 'crop/600/400/' + url.slice(index);
}